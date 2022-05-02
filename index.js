function AddImages() {
    let MainColumn = document.getElementById('main-col');

    let ArrayOfImageColumns = [];
    let FormattedArrayOfImageColumns = []

    function PushColumnsIntoArray() {
        for (let index = 0; index < 15; index++) {
            //Generate Random Picture Using Math.Random.
            let random = Math.floor(Math.random()*10000);
            let randomPic = `https://picsum.photos/500?random=${random}`;
            
            //Create Image Tag, Append 'randomPic' To <img /> and Set <img /> Dimensions.
            let image = document.createElement("img");
            image.setAttribute('src', randomPic);
            image.setAttribute('height', '100%');
            image.setAttribute('width', '100%');

            //Create The Columns Which Will Be Appended Onto The Rows (which will be created later) And Append Images To The Columns.
            let ImageColumns = document.createElement('div');
            ImageColumns.classList.add("col");
            ImageColumns.classList.add("items");
            ImageColumns.classList.add("col-sm-4");
            ImageColumns.classList.add("col-12");     
            ImageColumns.appendChild(image);

            //Push The Newly Created column-image To ArrayOfImageColumns.
            ArrayOfImageColumns = [...ArrayOfImageColumns, ImageColumns];
        }

        return ArrayOfImageColumns;
    }

    PushColumnsIntoArray(); //Call The Function.

    //Convert FormattedArrayOfImageColumns (which so far is an empty array) To This Format: [[col, col, col], [col, col, col], [col, col, col], ...].
    const ReduceArrayOfImageColumns = ArrayOfImageColumns.reduce((a,b) => {
        if (a.length == 3) {
            FormattedArrayOfImageColumns = [...FormattedArrayOfImageColumns, a];
            a = [];
            a = [...a, b];
        } else {
            a = [...a, b];
        }
        
        return a
    }, []);

    FormattedArrayOfImageColumns = [...FormattedArrayOfImageColumns, ReduceArrayOfImageColumns];

    //Loop Through Each [col, col, col] Which is Now Inside [FormattedArrayOfImageColumns] and inside the body, Loop Through Each col and append each col inside [col, col, col] to ImageColumnRows.
    const RowsColImg = FormattedArrayOfImageColumns.map(innerarray => {
        let ImageColumnRows = document.createElement('div');
        ImageColumnRows.classList.add('row');
        ImageColumnRows.classList.add('added-rows');
        innerarray.forEach((val, ind) => {
            ImageColumnRows.appendChild(val);
        });
        return ImageColumnRows;
    });

    //Loop Through Each Row (the argument, 'val' below) and Append Each Row To #MainColumn.
    RowsColImg.forEach(val => {
        MainColumn.appendChild(val);
    });
}

AddImages();

