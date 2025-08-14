import { Component ,OnInit} from '@angular/core';
import { ActivatedRoute , Router} from '@angular/router';
@Component({
  selector: 'app-search',
  imports: [],
  templateUrl: './search.html',
  styleUrl: './search.css'
})
export class Search  implements OnInit {
  searchTerm = '';

  constructor( activatedRoute:ActivatedRoute,private router:Router) {
    activatedRoute.params.subscribe((params) => {
      if (params.searchTerm) {
        this.searchTerm = params.searchTerm;
      }
    });
  }

  ngOnInit(): void {
    // Initialization logic can go here
  }

 search(term:string) :void{
  if (term) {
    this.router.navigateByUrl('/search/' + term);
  }
 }

}
