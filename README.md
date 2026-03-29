# Ethiopian Literary Archive

A beautifully designed, responsive static website celebrating Ethiopian writers and their literary works. Built with pure HTML, CSS, and JavaScript, this archive provides an elegant space to discover Ethiopian authors, explore their books, and learn about Ethiopia's rich literary heritage.

![EthArchive Link](images/readme.png)

## Features

### Author Collection
Grid display of Ethiopian authors with vintage-styled cards with author portraits, birth/death years and book count indicators

### Book Library
Detailed book pages with complete metadata
- Two-column layout with book covers and information
- Publication year, page count, genre, and publisher details
- Full book descriptions
- Series indicators and grouping

### Search & Discovery
- Real-time author search functionality
- Related authors section on author pages
- Other books by same author suggestions

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/etharchive/etharchive.git
   ```

2. **Navigate to the project directory**
   ```bash
   cd etharchive
   ```

3. **Open in browser**
   - Simply open `index.html` in any modern web browser
   - Or use a local server (recommended for development):
     ```bash
     python -m http.server 8000
     ```
     Then visit `http://localhost:8000`

##  Contributing

Contributions are welcome! Here's how you can help:

1. **Add Authors**: Submit new Ethiopian authors with accurate information
2. **Fix Bugs**: Report or fix issues in the code
3. **Improve Design**: Suggest or implement design enhancements
4. **Add Features**: Propose new features that would benefit users

### Contribution Process

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Adding New Authors

Edit `data.json` and add a new author object:

```json
{
  "id": 9,
  "name": "Author Name",
  "birthYear": 1970,
  "deathYear": null,
  "slug": "author-name",
  "imageUrl": "images/author-name.webp",
  "bio": "Author biography...",
  "externalLinks": {
    "wikipedia": "https://en.wikipedia.org/wiki/Author",
    "goodreads": "https://www.goodreads.com/author/show/123",
    "personal": "https://authorwebsite.com"
  },
  "featuredBook": 901,
  "books": [
    {
      "id": 901,
      "title": "Book Title",
      "year": 2020,
      "slug": "book-title",
      "description": "Book description...",
      "pages": 300,
      "genre": "Literary Fiction",
      "publisher": "Publisher Name",
      "coverUrl": "images/book-cover.webp",
      "series": null
    }
  ]
}
```

> Note:
> - Always use webp for images
> - Use Gregorian Calendar for dates

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

**Project Maintainer**: Yordanos Zerihun

- [Email](mailto:yordanoszt15@gmail.com)
- [Telegram](https://t.me/TheYordanos)

---

**Made with ❤️ for Ethiopian literature**
