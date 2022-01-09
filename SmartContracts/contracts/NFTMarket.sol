// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract NFTMarket is ReentrancyGuard {
    using Counters for Counters.Counter;
    Counters.Counter private _itemIds;
    Counters.Counter private _tokenIds;
    Counters.Counter private _itemsSold;
    address payable owner;
    uint256 listingPrice = 0.025 ether;

    constructor() {
        owner = payable(msg.sender);
    }

    //structs and mappings
    struct property {
        uint256 id;
        address owner;
        string propertycontractId;
    }

    mapping(uint256 => property) private _propertys;

    struct MarketItem {
        uint256 itemId;
        uint256 tokenId;
        address payable seller;
        address payable owner;
        uint256 price;
        bool sold;
    }

    mapping(uint256 => MarketItem) private idToMarketItem;
    mapping(string => bool) _propertycontractIdExiste;
    //Events
    event propertyCreated(uint256 id, address owner, string propertycontractId);
    event MarketSaleCreated(uint256 itemId, uint256 price);
    event MarketItemCreated(
        uint256 indexed itemId,
        uint256 indexed tokenId,
        address seller,
        address owner,
        uint256 price,
        bool sold
    );

    // functions
    //function to create a new proprety
    function createProprety(string memory _propertycontractId)
        public
        returns (uint256)
    {
        require(
            !_propertycontractIdExiste[_propertycontractId],
            "The property contract Id already Existe, it must be unique"
        );

        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _propertys[newItemId] = property(
            newItemId,
            msg.sender,
            _propertycontractId
        );
        //_mint(msg.sender, newItemId);
        _propertycontractIdExiste[_propertycontractId] = true;
        //setApprovalForAll(contractAddress, true);
        emit propertyCreated(newItemId, msg.sender, _propertycontractId);
        return newItemId;
    }

    function changeOwner(address newOwner, uint256 tokenId) public {
        _propertys[tokenId].owner = newOwner;
    }

    /* Returns the listing price of the contract */
    function getListingPrice() public view returns (uint256) {
        return listingPrice;
    }

    function getOwner() public view returns (address) {
        return owner;
    }

    /* Places an item for sale on the marketplace */
    function createMarketItem(uint256 tokenId, uint256 price)
        public
        payable
        nonReentrant
    {
        require(price > 0, "Price must be at least 1 wei");
        require(
            msg.value == listingPrice,
            "Price must be equal to listing price"
        );
        require(
            _propertys[tokenId].owner == msg.sender,
            "the seller must be the owner"
        );
        _itemIds.increment();
        uint256 itemId = _itemIds.current();

        idToMarketItem[itemId] = MarketItem(
            itemId,
            tokenId,
            payable(msg.sender),
            payable(address(0)),
            price,
            false
        );
        changeOwner(address(this), tokenId);
        emit MarketItemCreated(
            itemId,
            tokenId,
            msg.sender,
            address(0),
            price,
            false
        );
    }

    /* Creates the sale of a marketplace item */
    /* Transfers ownership of the item, as well as funds between parties */
    function createMarketSale(uint256 itemId) public payable nonReentrant {
        uint256 price = idToMarketItem[itemId].price;
        uint256 tokenId = idToMarketItem[itemId].tokenId;
        //convert from wei to eth
        require(
            (msg.value / 10**18) == price,
            "Please submit the asking price in order to complete the purchase"
        );
        idToMarketItem[itemId].seller.transfer(msg.value);
        changeOwner(msg.sender, tokenId);
        idToMarketItem[itemId].owner = payable(msg.sender);
        idToMarketItem[itemId].sold = true;
        _itemsSold.increment();
        payable(owner).transfer(listingPrice);
        emit MarketSaleCreated(itemId, msg.value);
    }

    /* Returns all unsold market items */
    function fetchMarketItems() public view returns (MarketItem[] memory) {
        uint256 itemCount = _itemIds.current();
        uint256 unsoldItemCount = _itemIds.current() - _itemsSold.current();
        uint256 currentIndex = 0;

        MarketItem[] memory items = new MarketItem[](unsoldItemCount);
        for (uint256 i = 0; i < itemCount; i++) {
            if (idToMarketItem[i + 1].owner == address(0)) {
                uint256 currentId = i + 1;
                MarketItem storage currentItem = idToMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    /* Returns onlyl items that a user has purchased */
    function fetchMyNFTs() public view returns (MarketItem[] memory) {
        uint256 totalItemCount = _itemIds.current();
        uint256 itemCount = 0;
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i + 1].owner == msg.sender) {
                itemCount += 1;
            }
        }

        MarketItem[] memory items = new MarketItem[](itemCount);
        for (uint256 i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i + 1].owner == msg.sender) {
                uint256 currentId = i + 1;
                MarketItem storage currentItem = idToMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    function getOwnerPropretyIds() public view returns (uint256[] memory) {
        uint256 totaltokenCount = _tokenIds.current();
        uint256 itemCount = 0;
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < totaltokenCount; i++) {
            if (_propertys[i + 1].owner == msg.sender) {
                itemCount += 1;
            }
        }

        uint256[] memory owneIds = new uint256[](itemCount);
        for (uint256 i = 0; i < totaltokenCount; i++) {
            if (_propertys[i + 1].owner == msg.sender) {
                uint256 currentId = i + 1;
                uint256 currentOwnerPropretyId = _propertys[currentId].id;
                owneIds[currentIndex] = currentOwnerPropretyId;
                currentIndex += 1;
            }
        }
        return owneIds;
    }

    function cancelMarketSell(uint256 itemId) public {
        changeOwner(msg.sender, idToMarketItem[itemId].tokenId);
        idToMarketItem[itemId].owner = payable(msg.sender);
        idToMarketItem[itemId].sold = true;
        _itemsSold.increment();
    }

    /* Returns only items a user has created */
    function fetchItemsCreated() public view returns (MarketItem[] memory) {
        uint256 totalItemCount = _itemIds.current();
        uint256 itemCount = 0;
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i + 1].seller == msg.sender) {
                itemCount += 1;
            }
        }

        MarketItem[] memory items = new MarketItem[](itemCount);
        for (uint256 i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i + 1].seller == msg.sender) {
                uint256 currentId = i + 1;
                MarketItem storage currentItem = idToMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    function displayAllTransactions()
        public
        view
        returns (MarketItem[] memory)
    {
        uint256 totalItemCount = _itemIds.current();
        uint256 itemCount = 0;
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i + 1].sold == true) {
                itemCount += 1;
            }
        }

        MarketItem[] memory items = new MarketItem[](itemCount);
        for (uint256 i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i + 1].sold == true) {
                uint256 currentId = i + 1;
                MarketItem storage currentItem = idToMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }
}
