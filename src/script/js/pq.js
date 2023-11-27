var parquet = require('parquetjs-lite');

const foo = async () => {

    try {
        // create new ParquetReader that reads from 'fruits.parquet`
        let reader = await parquet.ParquetReader.openFile('./fruits.parquet');
        
        // create a new cursor
        let cursor = reader.getCursor();
        
        // read all records from the file and print them
        let record = null;
        while (record = await cursor.next()) {
            console.log('yo', record);
        }     
        await reader.close();
   
    } catch (error) {
        console.log('error', error)
    }
    
}

foo();


