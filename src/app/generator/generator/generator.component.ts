import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { environment } from "src/environments/environment";

@Component({
	selector: "app-generator",
	templateUrl: "./generator.component.html",
	styleUrls: ["./generator.component.scss"],
})
export class GeneratorComponent implements OnInit {
	@ViewChild("clickToCopy") clickToCopy!: ElementRef;
	@ViewChild("copy") copy!: ElementRef;
	similarity_1: string = environment.similarity_1;
	lengthValue: number = 0;
	capitals: string[] = [
		"A",
		"B",
		"C",
		"D",
		"E",
		"F",
		"G",
		"H",
		"I",
		"J",
		"K",
		"L",
		"M",
		"N",
		"Ñ",
		"O",
		"P",
		"Q",
		"R",
		"S",
		"T",
		"U",
		"V",
		"W",
		"X",
		"Y",
		"Z",
	];
	lowercase: string[] = [
		"a",
		"b",
		"c",
		"d",
		"e",
		"f",
		"g",
		"h",
		"i",
		"j",
		"k",
		"l",
		"m",
		"n",
		"ñ",
		"o",
		"p",
		"q",
		"r",
		"s",
		"t",
		"u",
		"v",
		"w",
		"x",
		"y",
		"z",
	];
	number: string[] = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "1"];
	symbols: string[] = [
		"!",
		"@",
		"#",
		"$",
		"%",
		"&",
		"*",
		"?",
		".",
		",",
		";",
		":",
		"¿",
		"¡",
		"|",
		"=",
		"-",
		"_",
		"+",
		"~",
		"^",
		"¨",
		"·",
	];
	options: string[] = ["capitals", "lowercase", "number"];
	optionsGenerate(typo: string) {
		if (!!this.options.find((option) => option === typo)) {
			this.options = this.options.filter((option) => option !== typo);
		} else {
			this.options.push(typo);
		}
	}
	value(e: any) {
		console.log(e);
		this.lengthValue = e;
	}
	functions: any = {
		mayus: () => {
			let rand = Math.floor(Math.random() * this.capitals.length);
			let nv: any = this.similarity_1.split("");
			if (rand < nv.length) {
				let res = (nv[rand] + this.capitals.length) % this.capitals.length;
				return this.capitals[res];
			} else {
				return this.capitals[rand];
			}
		},
		minus: () => {
			let rand = Math.floor(Math.random() * this.lowercase.length);
			let nv: any = this.similarity_1.split("");
			if (rand < nv.length) {
				let res = (nv[rand] + this.lowercase.length) % this.lowercase.length;
				return this.lowercase[res];
			} else {
				return this.lowercase[rand];
			}
		},
		nums: () => {
			let rand = Math.floor(Math.random() * this.number.length);
			let nv: any = this.similarity_1.split("");
			if (rand < nv.length) {
				let res = (nv[rand] + this.number.length) % this.number.length;
				return this.number[res];
			} else {
				return this.number[rand];
			}
		},
		simb: () => {
			let rand = Math.floor(Math.random() * this.symbols.length);
			let nv: any = this.similarity_1.split("");
			if (rand < nv.length) {
				let res = (nv[rand] + this.symbols.length) % this.symbols.length;
				return this.symbols[res];
			} else {
				return this.symbols[rand];
			}
		},
	};
	copyToClipboard(item: any) {
		document.addEventListener("copy", (e: ClipboardEvent) => {
			this.clickToCopy.nativeElement.style =
				"transform: translateY(200%); opacity: 0;";
			this.copy.nativeElement.style =
				"transform: translateY(0%); opacity: 0.5;";
			if (e.clipboardData) {
				e.clipboardData.setData("text/plain", this.password_generate);
				e.preventDefault();
			}
		});
		document.execCommand("copy");
	}
	nvClass = "";
	password_generate: string = "";
	generatePassword(): void {
		this.nvClass = "actt";
		this.copy.nativeElement.style = "transform: translateY(200%); opacity: 0;";
		this.clickToCopy.nativeElement.style =
			"transform: translateY(0%); opacity: 0.5;";
		this.password_generate = "";
		let find_capitals = !!this.options.find(
			(option) => option === "capitals"
		);
		let find_lowercase = !!this.options.find(
			(option) => option === "lowercase"
		);
		let find_number = !!this.options.find((option) => option === "number");
		let find_symbols = !!this.options.find((option) => option === "symbols");
		if (!find_number && !find_symbols && !find_capitals && !find_lowercase) {
			alert("Select at least one setting option");
			throw new Error("You have not selected at least one option");
		}
		let j = 0;
		for (let i = 0; i < this.lengthValue; i++) {
			let rand = Math.floor(Math.random() * 4);
			if (rand == 0 && find_capitals) {
				this.password_generate += this.functions.mayus();
				j = 0;
			} else if (rand == 1 && find_lowercase) {
				this.password_generate += this.functions.minus();
				j = 1;
			} else if (rand == 2 && find_number) {
				this.password_generate += this.functions.nums();
				j = 2;
			} else if (rand == 3 && find_symbols) {
				this.password_generate += this.functions.simb();
				j = 3;
			} else {
				i--;
			}
		}
		console.log(this.password_generate.length);
	}
	ngOnInit(): void {
		this.lengthValue = 16;
	}
}
