import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-word-count',
  templateUrl: './word-count.component.html',
  styleUrls: ['./word-count.component.scss']
})
export class WordCountComponent implements OnInit {

  public char_count: number = 0;
  public char_count_spaces: number = 0;
  public word_count: number = 0;
  public sentence_count: number = 0;
  public paragraph_count: number = 0;
  public reading_speed: number = 0;
  public speaking_speed: number = 0;

  public descriptionControl = new FormControl('');

  constructor() { }

  ngOnInit(): void {
    this.word_count = 0;
    this.descriptionControl.valueChanges.subscribe(value => {
      // this.char_count = (value.replace(/\s/g, '').length)
      // this.char_count_spaces = (value.replace(/\n/g, '').length)
      // this.word_count = (value.split(' ').length)
      // this.sentence_count = value ? value.match(/[\w|\)][.?!](\s|$)/g,'').length : 0;
      // this.paragraph_count = value ? value.replace(/\n$/gm, '').split(/\n/).length : 0;
      const a = this.a(value);
      this.char_count = this.showComma(a.characters);
      this.char_count_spaces = this.showComma(a.all);
      this.word_count = this.showComma(a.words);
      this.sentence_count = this.showComma(a.sentences);
      this.paragraph_count = this.showComma(a.paragraphs);
      this.reading_speed = a.words / 200;
      this.speaking_speed = a.words / 125;
    })
  }
  
  decode (string) {
    const output = []
  	let counter = 0
  	const length = string.length

  	while (counter < length) {
  		const value = string.charCodeAt(counter++)
  		if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
  			const extra = string.charCodeAt(counter++)
  			if ((extra & 0xFC00) == 0xDC00) { // Low surrogate.
  				output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000)
  			} else {
  				output.push(value)
  				counter--
  			}
  		} else {
  			output.push(value)
  		}
  	}
  	return output
  }

  showComma(string) {
    return string.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  public a(original) {
    const trimmed = original.trim();
    return {
      paragraphs: trimmed ? (trimmed.match(/\n+/g) || []).length + 1 : 0,
      // sentences: trimmed ? (trimmed.match(/[\w|\)][.?!](\s|$)/g) || []).length : 0,
      sentences: trimmed ? (trimmed.match(/[.?!…]+./g) || []).length + 1 : 0,
      words: trimmed ? (trimmed.replace(/['";:,.?¿\-!¡]+/g, '').match(/\S+/g) || []).length : 0,
      characters: trimmed ? this.decode(trimmed.replace(/\s/g, '')).length : 0,
      all: this.decode(trimmed.replace(/\n/g, '')).length
    }
  }

}
