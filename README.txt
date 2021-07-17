A machine learning system developed in python that ranks proteins in a proteome as per their Anti-CRISPR tendencies predicted using sequence features.

The method takes as input a proteome in FASTA format and returns a ranked list as per the expected Acr behavior in csv format.
Training model,
python train.py

Use the following command to generate predictions:
python arguments.py <input file name> <output file name>

For example,
cd API
python arguments.py data/sequence.fasta data/results

Following packages are required:
Biopython
sklearn
scipy

