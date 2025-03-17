const express = require("express");
const app = express ();
app.use(express.json());

const PORT = process.env.PORT || 3000; //establishing which port to listen on

let bookArr = [];

app.get("/whoami", (request, response) => {
   const status = {
      "StudentNumber": "2667536"
   };
   
   response.send(status);
});

//get all the books
app.get("/books", (request, response) => {
    
    response.send(bookArr);
 });

 //get a book by its id
app.get("/books/:id", (request, response) => {
    const book=bookArr.find(bkd =>bkd.id === request.params.id); 

    //error handling
    if(!book){
        //if book not found
        return response.status(404).json({message: "Not Found"});
    }
    response.json(book);

});

//add a new book
 app.post("/books", (request, response) => {
    const {id,title,details} = request.body;
    
    if (!id || !title || !details || !Array.isArray(details)){
        return response.status(400).json({message: "Bad Request"});
    }
    bookArr.push({id,title,details});//add to array
    response.status(200).json({message: "Book added successfully"});
 });


 //update a specific book's details
 app.put("/books/:id", (request, response) => {
    const book=bookArr.find(bk =>bk.id === request.params.id); 

    //error handling
    if(!book){
        //if book not found
        return response.status(404).json({message: "Not Found"});
    }
    const bookDetail = book.details.find(det=>det.id===request.params.id);
    const {author,genre,publicationYear} = request.body;

    //updating the data in book details if empty or using the one provided
    // Update book details
    const { title, details } = req.body;
    if (title) books[bookIndex].title = title;
    if (details) books[bookIndex].details = details;

    res.json(books[bookIndex]);
    response.status(200).json({message: "Book updated successfully"});
 });


 //delete a book by id
 app.delete("/books/:id", (request, response) => {
    const bookIndex = bookArr.findIndex(bk =>bk.id === request.params.id);
    if(bookIndex === -1){
        //if book not found
        return response.status(404).json({message: "Not Found"});
    }
    bookArr.splice(bookIndex, 1);
    response.status(200).json({message: "Book deleted successfully"});
 });


 //add in book details
 app.post("/books/:id/details", (request, response) => {
    const bookIndex = bookArr.findIndex(bk =>bk.id === request.params.id);
    if(!book){
        //if book not found
        return response.status(404).json({message: "Not Found"});
    } 
    const {id,author,genre,publicationYear} = request.body;    
    if (!id || !author || !genre|| !publicationYear){
        return response.status(400).json({message: "Bad Request"});
    }
    bookArr.push({id,author,genre,publicationYear});

    response.status(200).json({message: "Book details added successfully"});
 });

 //delete a specific book detail
 app.delete("/books/:id/details/:detailedId", (request, response) => {
    const book = bookArr.find(bk =>bk.id === request.params.id);
    if(!book){
        //if book not found
        return response.status(404).json({message: "Not Found"});
    }
    const detailIndex = book.details.findIndex(dt =>dt.id === request.params.detailedId);
    if(detailIndex ===-1){
        //if book not found
        return response.status(404).json({message: "Not Found"});
    }

    book.details.splice(detailIndex, 1);
    response.status(200).json({message: "Book details deleted successfully"});
 });

 // Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});