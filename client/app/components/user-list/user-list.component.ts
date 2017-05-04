import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../../app.animation';

@Component({
    selector: 'im-user-list',
    templateUrl: './app/components/user-list/user-list.component.html',
    styleUrls: ['./app/components/user-list/user-list.component.css'],
    animations: [routerTransition()],
    host: { '[@routerTransition]': '' }
})

export class UserListComponent implements OnInit {
    users = [
        {'id': '1', 'username': 'username1', 'fullname': 'Trần Văn A', 'phone': '...', 'email': '...', 'role': 'Thủ kho', 'checked': false },
        {'id': '2', 'username': 'username2', 'fullname': 'Nguyễn Văn B', 'phone': '...', 'email': '...', 'role': 'Thủ kho', 'checked': false },
        {'id': '3', 'username': 'username3', 'fullname': 'Lê Văn C', 'phone': '...', 'email': '...', 'role': 'Kế toán kho', 'checked': false },
        {'id': '4', 'username': 'username4', 'fullname': 'Ngô Thị D', 'phone': '...', 'email': '...', 'role': 'Kế toán kho', 'checked': false },
        {'id': '5', 'username': 'username5', 'fullname': 'Hoàng Ngọc N', 'phone': '...', 'email': '...', 'role': 'Thủ kho', 'checked': false }
    ]

    checkedBoxs = 0;
    isCheckedAll = false;
    
    constructor(
        private router: Router) {
    }

    ngOnInit() {
        console.log(this.users.length);
    }

    onCheck() {
        let check = 0;
        this.users.forEach(function(el, idx){
            check += (el.checked) ? 1 : 0;
        });
        this.isCheckedAll = (check == this.users.length);
    }

    checkAll(event) {
        let check = event.target.checked;
        this.users.forEach(function(el, idx){
            el.checked = check;
        });
    }

    onCheckRow(unit) {
        unit.checked = !unit.checked;
        this.onCheck();
    }

    onActionClick(event) {
        event.stopPropagation();
        console.log('abc');
    }
}