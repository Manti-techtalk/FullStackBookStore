import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Book() {
    const [toggle, setToggle] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [inputValue1, setInputValue1] = useState('');
    const [inputValue2, setInputValue2] = useState('');
    const [inputValue3, setInputValue3] = useState('');
    const [inputValue4, setInputValue4] = useState('');
    const [books, setBooks] = useState([]);

    const handleClick = () => {
        setToggle(!toggle);
    }

    const fetchBooks = () => {
        axios.get('http://127.0.0.1:8000/api/books/')
            .then(response => {
                setBooks(response.data);
            })
            .catch(error => {
                console.error('Error fetching books:', error);
            });
    }

    useEffect(() => {
        fetchBooks();
    }, []);

    const addBook = () => {
        const bookData = {
            title: inputValue,
            author: inputValue1,
            isbn: inputValue2,
            publishedYear: inputValue3,
            genre: inputValue3,
            description: inputValue4
        };

        axios.post('http://127.0.0.1:8000/api/books/', bookData)
            .then(response => {
                console.log('Book added successfully:', response.data);
                fetchBooks(); // Fetch the updated list of books
            })
            .catch(error => {
                console.error('Error adding book:', error);
            });
    }

    const deleteBook = (id) => {
        axios.delete(`http://127.0.0.1:8000/api/books/${id}/`)
            .then(response => {
                console.log('Book deleted successfully');
                fetchBooks(); // Fetch the updated list of books
            })
            .catch(error => {
                console.error('Error deleting book:', error);
            });
    }

    const buttonOption = (
        <>
            <div className="row">
                <div className="col-12">
                    <button onClick={handleClick} className='btn btn-primary'>
                        {toggle ? 'More Options' : 'Hide Options'}
                    </button> 
                    <i className="fa-solid fa-rotate-right"></i>
                </div>
            </div>
        </>
    );

    const optionalContent = (
        <div style={{ backgroundColor: '#f5f5f5' }}>
            <div className="row m-5">
                <div className="col-6">
                    <label htmlFor="title"><b>TITLE</b></label><br />
                    <input
                        className='bg-white form-control'
                        value={inputValue} onChange={(e) => setInputValue(e.target.value)} type="text" name="" id="" />
                </div>
                <div className="col-6">
                    <label htmlFor="title"><b>AUTHOR</b></label><br />
                    <input
                        className='bg-white form-control'
                        value={inputValue1} onChange={(e) => setInputValue1(e.target.value)} type="text" name="" id="" />
                </div>
            </div>
            <div style={{ backgroundColor: 'ebeff5' }} className="row m-5">
                <div className="col-6">
                    <label htmlFor="title"><b>ISBN</b></label><br />
                    <input
                        className='bg-white form-control'
                        value={inputValue2} onChange={(e) => setInputValue2(e.target.value)} type="text" name="" id="" />
                </div>
                <div className="col-6">
                    <label htmlFor="title"><b>PUBLISHED YEAR</b></label><br />
                    <input
                        className='bg-white form-control'
                        value={inputValue3} onChange={(e) => setInputValue3(e.target.value)} type="text" name="" id="" />
                </div>
                <div className="col-6">
                    <label htmlFor="title"><b>GENRE</b></label><br />
                    <input
                        className='bg-white form-control'
                        value={inputValue3} onChange={(e) => setInputValue3(e.target.value)} type="text" name="" id="" />
                </div>
                <div className="col-6">
                </div>
                <div className="col-6">
                    <label htmlFor="title"><b>DESCRIPTION</b></label><br />
                    <input
                        className='bg-white form-control' style={{ height: '200px' }}
                        value={inputValue4} onChange={(e) => setInputValue4(e.target.value)} type="text" name="" id="" />
                </div>
            </div>
            <div className="row m-5">
                <div className="col-12">
                    <button className='btn btn-primary m-2' onClick={addBook}>Add Book</button>
                    <button className='btn btn-default border border-dark'>Cancel</button>
                </div>
            </div>
        </div>
    );

    return (
        <div className="container">
            <div className="row text-center">
                <div className="col-12">
                    <p className='h1'>BOOK MANAGEMENT</p>
                </div>
            </div>
            <div className="row text-center">
                <div className="col-12">
                    {buttonOption}
                </div>
            </div>
            {toggle ? optionalContent : null}
            <div className="row">
                <div className="col-12">
                    <h2>Books List</h2>
                    <ul>
                        {books.map(book => (
                            <li key={book.id}>
                                {book.title} - {book.author}
                                <button onClick={() => deleteBook(book.id)} className='btn btn-danger ml-2'>Delete</button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Book;
