// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract NFT is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    address contractAddress;
    mapping(string => bool) _propertycontractIdExiste;
    struct property {
        uint256 id;
        address owner;
        string propertycontractId;
    }
    //Creating Proprety Event
    event propertyCreated(uint256 id, address owner, string propertycontractId);

    mapping(uint256 => property) private _propertys;

    constructor(address marketplaceAddress) ERC721("Metaverse", "METT") {
        contractAddress = marketplaceAddress;
    }

    function createProprety(address _owner, string memory _propertycontractId)
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
            _owner,
            _propertycontractId
        );
        _mint(msg.sender, newItemId);
        _propertycontractIdExiste[_propertycontractId] = true;
        setApprovalForAll(contractAddress, true);
        emit propertyCreated(newItemId, _owner, _propertycontractId);
        return newItemId;
    }
}
