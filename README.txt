A machine learning system developed in python helps predict whether 1 protein in a proteome will follow their Anti-CRISPR trends predicted using sequence features.

This method takes as input a proteome in FASTA format and returns a list of expected Acrs in csv format.
Training model,
python train.py

Use the following command to generate predictions:
python arguments.py <input file name> <output file name>

For example,
cd API
python arguments.py data/sequence.fasta data/results

For Web-Server,
    Front-end(reactjs): 
        cd Website
        npm install
        npm start
    Back-end(flask-python):
        cd API
        python api.py
Environment
    Window 10, Python 3

Following packages are required:
Biopython
sklearn
scipy
Flask
flask_cors

