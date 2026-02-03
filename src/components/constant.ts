import { useState } from "react";
import { v4 } from "uuid";

type BookInstance = {
	id?: any;
	title: string;
	author: string;
	pages: string;
	status: string;
	updateStatus?: (status: string) => void;
};

class Book {
	id: string;
	title: string;
	author: string;
	pages: string;
	status: string;

	constructor({ title, author, pages, status }: BookInstance) {
		this.id = v4();
		this.title = title;
		this.author = author;
		this.pages = pages;
		this.status = status;
	}
	updateStatus(status: string) {
		this.status = status;
	}
}
// function Book(
// 	this: BookInstance,
// 	title: string,
// 	author: string,
// 	pages: string,
// 	status: string,
// ) {
// 	if (!new.target) throw new Error("something went wrong, please try again.");
// 	this.id = v4();
// 	this.title = title;
// 	this.author = author;
// 	this.pages = pages;
// 	this.status = status;
// }

// Book.prototype.updateStatus = function (this: BookInstance, status: string) {
// 	this.status = status;
// };

export default function useLibrary() {
	const [book, setBook] = useState<BookInstance[]>([]);
	function addNewbook(
		title: string,
		author: string,
		pages: string,
		status: string,
	) {
		// funciotn for adding new books to the data
		const newBook = new Book({ title, author, pages, status });
		setBook((prev) => [...prev, newBook]);
	}
	function changeStatus(id: string, status: string) {
		setBook((prev) =>
			prev.map((item) => {
				if (item.id === id) {
					item.updateStatus?.(status);
				}
				return item;
			}),
		);
	}

	function deleteBook(id: string) {
		setBook((prev) => prev.filter((item) => item.id !== id));
	}
	return { book, setBook, addNewbook, changeStatus, deleteBook };
}
