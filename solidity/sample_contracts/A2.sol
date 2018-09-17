pragma solidity ^0.4.24;

// assigning static size array to storage type uint array variable 
// without designated size 

contract A{
    uint[]  array;  
    
    constructor() public{
        uint[] memory a = new uint[](7);
        array = a;    
    }
}