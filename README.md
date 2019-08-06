## mysql-h2-converter
Converts mysql script to h2 compatible script

### What is this repository for?
Repository has a script which takes mysql data file as input and converts into h2 compatible script. It will be enhanced to fully support conversion of mysql schema to h2 schema as well.

### Setup
```
Node with any version preferably above v7
Steps:
npm install
node --harmony h2converter.js <xxxx.sql>
```

Converted file will be available as h2-formatted/formatted.sql location.

### What does script do?
1. Reads input file provided in command line
2. Returns error if input file is not passed as argument
3. Deletes directory 'h2-formatted' if present and creates again
4. Converts to h2 compatible format by replacing below characters
```
` ->
\\0 -> 0
\\1 -> 1
\u0000 -> 0
\u0001 -> 1
For schema conversion
bigint -> numeric
int sizes to just integer
all enums to varchars
remove all default values
remove character sets
```

### Work in progress
1. Fully supporting conversion of mysql schema to h2 compatible schema
2. Test cases
