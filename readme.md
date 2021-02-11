1. Blockchain is an immutable, sequential chain of records called Blocks.
2. They can contain
   a. Transactions
   b. Files
   c. Any data you want, really.

   But they are chained together using hashes.

What is hash?
We know.

Note, the hash of the previous block is what maintains the integrity of the chain. To check the integrity of the chain we go through the chain calculating each block’s hash and matching it with this previousHash data. If one single piece of the block’s information is tampered with, it will spit out a completely different hash and will be immediately detectable when matched against the previousHash data stored in the block following the tampered block.
