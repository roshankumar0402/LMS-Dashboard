import { Injectable, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { v4 as uuidv4 } from 'uuid';
import { AddBookModalComponent } from '../components/add-book-modal/add-book-modal.component';
import { Router } from '@angular/router';
import { ViewBookModalComponent } from '../components/view-book-modal/view-book-modal.component';
import { Subject } from 'rxjs';
import { ConfirmComponent } from '../components/confirm/confirm.component';

@Injectable({
  providedIn: 'root',
})
export class MasterService {
  constructor(public dialog: MatDialog) {}
  router = inject(Router);
  books: any[] = [];
  book = {
    id: '',
    title: '',
    author: '',
    desc: '',
    genre: '',
    price: 0,
    pages: 1,
    rating: 1,
    createdTime: 0,
    lastViewedTime: 0,
    favorite: false,
    archive: false,
  };

  getBooks() {
    const localData = localStorage.getItem('bookList');
    if (localData != null) {
      const converted = JSON.parse(localData);
      this.books = converted;
      return converted;
    }
  }
  // getFilteredBooks() {
  //   const localData = localStorage.getItem('filtered');
  //   if (localData != null) {
  //     const converted = JSON.parse(localData);
  //     this.books = converted;
  //   }
  //   return this.books;
  // }

  generateUniqueId() {
    return uuidv4();
  }

  openDialog() {
    this.getBooks();
    const dialogRef = this.dialog.open(AddBookModalComponent, {
      data: {
        title: this.book.title,
        author: this.book.author,
        desc: this.book.desc,
        genre: this.book.genre,
        rating: this.book.rating,
        price: this.book.price,
        pages: this.book.pages,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        this.book.title = result.title;
        this.book.author = result.author;
        this.book.desc = result.desc;
        this.book.genre = result.genre;
        this.book.rating = result.rating;
        this.book.price = result.price;
        this.book.pages = result.pages;
        this.book.createdTime = new Date().getTime();
        this.book.lastViewedTime = new Date().getTime();
        this.book.favorite = false;
        this.book.archive = false;
        this.book.id = this.generateUniqueId();
        this.books = [...this.books, this.book];
        localStorage.setItem('bookList', JSON.stringify(this.books));
        this.book = {
          id: '',
          title: '',
          author: '',
          desc: '',
          genre: '',
          price: 0,
          pages: 1,
          rating: 1,
          createdTime: 0,
          lastViewedTime: 0,
          favorite: false,
          archive: false,
        };
      }
    });
    return this.books;
  }

  genres = [
    { name: 'Romance', icon: 'favorite' },
    { name: 'Science Fiction', icon: 'explore' },
    { name: 'Fantasy', icon: 'brightness_high' },
  ];
  filteredBooks: any[] = [];
  type: string = '';
  getGenres() {
    return this.genres;
  }
  genreAction(item: string) {
    this.filteredBooks = this.books.filter((book) => book.genre === item);
    this.type = item;
    localStorage.setItem('filtered', JSON.stringify(this.filteredBooks));
    localStorage.setItem('type', JSON.stringify(this.type));
    this.router.navigateByUrl('table');
  }
  toggleFav(id: string) {
    const currBook = this.books.find((b) => b.id == id);
    if (currBook) {
      currBook.favorite = true;
    }
    localStorage.setItem('bookList', JSON.stringify(this.books));
    this.genreAction(this.type);
  }
  toggleArchive(id: string) {
    const currBook = this.books.find((b) => b.id == id);
    if (currBook) {
      currBook.archive = true;
    }
    localStorage.setItem('bookList', JSON.stringify(this.books));
    this.genreAction(this.type);
  }
  toggleFav2(id: string) {
    const currBook = this.books.find((b) => b.id == id);
    if (currBook) {
      currBook.favorite = true;
    }
    localStorage.setItem('bookList', JSON.stringify(this.books));
    // this.genreAction(this.type);
  }
  toggleArchive2(id: string) {
    const currBook = this.books.find((b) => b.id == id);
    if (currBook) {
      currBook.archive = true;
    }
    localStorage.setItem('bookList', JSON.stringify(this.books));
    // this.genreAction(this.type);
  }
  goToFavPage() {
    this.filteredBooks = this.books.filter((book) => book.favorite == true);
    localStorage.setItem('filtered', JSON.stringify(this.filteredBooks));
    this.router.navigateByUrl('favorites');
  }
  goToArchivesPage() {
    this.filteredBooks = this.books.filter((book) => book.archive == true);
    localStorage.setItem('filtered', JSON.stringify(this.filteredBooks));
    this.router.navigateByUrl('archives');
  }
  getFilteredBooks() {
    return this.filteredBooks;
  }

  removeFav(id: string) {
    const currBook = this.books.find((b) => b.id == id);
    if (currBook) {
      currBook.favorite = false;
    }
    localStorage.setItem('bookList', JSON.stringify(this.books));
    this.goToFavPage();
  }
  removeArchive(id: string) {
    const currBook = this.books.find((b) => b.id == id);
    if (currBook) {
      currBook.archive = false;
    }
    localStorage.setItem('bookList', JSON.stringify(this.books));
    this.goToArchivesPage();
  }
  goToDashboard() {
    this.router.navigateByUrl('dashboard');
  }
  genresStringArray: string[] = [];
  getGenresArray(): string[] {
    this.genresStringArray = this.genres.map((genre) => genre.name);
    // console.log(this.genresStringArray);
    return this.genresStringArray;
  }

  // getGenreCount(): number[] {
  //   let Rom = 0,
  //     SciFi = 0,
  //     Fant = 0;
  //   this.getBooks();
  //   this.books.forEach((item) => {
  //     if (item.genre == 'Romance') {
  //       Rom = Rom + 1;
  //     }
  //     if (item.genre == 'Science Fiction') {
  //       SciFi = SciFi + 1;
  //     }
  //     if (item.genre == 'Fantasy') {
  //       Fant = Fant + 1;
  //     }
  //   });
  //   let countArray: number[] = [];
  //   countArray.push(Rom);
  //   countArray.push(SciFi);
  //   countArray.push(Fant);
  //   // console.log(countArray);

  //   return countArray;
  // }
  getGenreCount(): number[] {
    let genreCounts: { [genre: string]: number } = {};
    this.genres.forEach((genre) => {
      genreCounts[genre.name] = 0;
    });
    this.books.forEach((book) => {
      if (genreCounts.hasOwnProperty(book.genre) && book.archive == false) {
        genreCounts[book.genre]++;
      }
    });
    const countArray: number[] = this.genres.map(
      (genre) => genreCounts[genre.name]
    );
    return countArray;
  }

  redirectToHome() {
    this.router.navigateByUrl('home');
  }

  recent(time: string) {
    const currentTime = new Date().getTime();
    let timeThreshold: number;

    switch (time) {
      case '10':
        timeThreshold = currentTime - 10 * 60 * 1000; //10 * 60 * 1000;
        break;
      case '1hr':
        timeThreshold = currentTime - 60 * 60 * 1000; // 60 * 60 * 1000;
        break;
      case '5hr':
        timeThreshold = currentTime - 5 * 60 * 60 * 1000;
        break;
      default:
        return;
    }
    this.getBooks();
    this.filteredBooks = this.books.filter(
      (book) => book.lastViewedTime >= timeThreshold
    );
    // localStorage.setItem('filteredByTime', JSON.stringify(this.filteredBooks))
    this.router.navigateByUrl('recent');
  }

  updateValue = new Subject<any>();

  openModal(key: string, subVal: string) {
    this.getBooks();
    let viewBook = this.books.find((x) => x.id == key);

    const dialogRef = this.dialog.open(ViewBookModalComponent, {
      data: {
        title: viewBook.title,
        author: viewBook.author,
        desc: viewBook.desc,
        genre: viewBook.genre,
        rating: viewBook.rating,
        price: viewBook.price,
        pages: viewBook.pages,
        favorite: viewBook.favorite,
        archive: viewBook.archive,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        viewBook.title = result.title;
        viewBook.author = result.author;
        viewBook.desc = result.desc;
        viewBook.genre = result.genre;
        viewBook.rating = result.rating;
        viewBook.price = result.price;
        viewBook.pages = result.pages;
        // this.book.createdTime = new Date().getTime();
        viewBook.lastViewedTime = new Date().getTime();
        viewBook.favorite = result.favorite;
        viewBook.archive = result.archive;
        // this.book.id = this.generateUniqueId();
        // this.books = [...this.books, this.book];
        localStorage.setItem('bookList', JSON.stringify(this.books));
        this.book = {
          id: '',
          title: '',
          author: '',
          desc: '',
          genre: '',
          price: 0,
          pages: 1,
          rating: 1,
          createdTime: 0,
          lastViewedTime: 0,
          favorite: false,
          archive: false,
        };
      }
    });
    if (subVal == 'favorites' || subVal == 'archives') {
      this.router.navigateByUrl(subVal);
    } else {
      this.router.navigate(['table'], { queryParams: { genre: subVal } });
    }
    return this.books;
  }
  openModalGen(key: string, url: string, subKey: string, subVal: string) {
    this.getBooks();
    let viewBook = this.books.find((x) => x.id == key);

    const dialogRef = this.dialog.open(ViewBookModalComponent, {
      data: {
        title: viewBook.title,
        author: viewBook.author,
        desc: viewBook.desc,
        genre: viewBook.genre,
        rating: viewBook.rating,
        price: viewBook.price,
        pages: viewBook.pages,
        favorite: viewBook.favorite,
        archive: viewBook.archive,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        viewBook.title = result.title;
        viewBook.author = result.author;
        viewBook.desc = result.desc;
        viewBook.genre = result.genre;
        viewBook.rating = result.rating;
        viewBook.price = result.price;
        viewBook.pages = result.pages;
        // this.book.createdTime = new Date().getTime();
        viewBook.lastViewedTime = new Date().getTime();
        viewBook.favorite = result.favorite;
        viewBook.archive = result.archive;
        // this.book.id = this.generateUniqueId();
        // this.books = [...this.books, this.book];
        localStorage.setItem('bookList', JSON.stringify(this.books));
        this.book = {
          id: '',
          title: '',
          author: '',
          desc: '',
          genre: '',
          price: 0,
          pages: 1,
          rating: 1,
          createdTime: 0,
          lastViewedTime: 0,
          favorite: false,
          archive: false,
        };
      }
    });
    this.router.navigate([url], { queryParams: { [subKey]: subVal } });
    return this.books;
  }

  confirmDialog() {
    const dialogRef = this.dialog.open(ConfirmComponent);
    return dialogRef.afterClosed();
  }
}
