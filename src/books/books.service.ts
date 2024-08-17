import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto, UpdateBookDto } from './dto/create-book.dto';

@Injectable()
export class BooksService {
  private books = [];

  create(createBookDto: CreateBookDto) {
    const newBook = { id: Date.now().toString(), ...createBookDto };
    this.books.push(newBook);
    return newBook;
  }

  findOne(id: string) {
    const book = this.books.find(book => book.id === id);
    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    return book;
  }

  update(id: string, updateBookDto: UpdateBookDto) {
    const bookIndex = this.books.findIndex(book => book.id === id);
    if (bookIndex === -1) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    const updatedBook = { ...this.books[bookIndex], ...updateBookDto };
    this.books[bookIndex] = updatedBook;
    return updatedBook;
  }

  remove(id: string) {
    const bookIndex = this.books.findIndex(book => book.id === id);
    if (bookIndex === -1) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    const removedBook = this.books.splice(bookIndex, 1);
    return removedBook;
  }
}
