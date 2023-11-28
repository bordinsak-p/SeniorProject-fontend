import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TABLE_SEARCH } from '../../constants/table-options';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    // styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit{
    searchForm: FormGroup;
    user: any[]
    cols = TABLE_SEARCH

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
        this.onInitForm()
    }

    onInitForm() {
        this.searchForm = this.fb.group({
            firstname: [null],
            lastname: [null],
            email: [null],
            username: [null],
            role: [null],
            createdAt: [null]
        })
    }

    onSearch() {}

    onClear() {}
}
