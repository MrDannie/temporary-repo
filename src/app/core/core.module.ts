import { NgModule } from '@angular/core';
import { NavBarComponent } from './navbar/navbar.component';
import { DataService } from './services/data.service';
import { FilterService } from './services/filter.service';
import { RouterModule } from '@angular/router';
import { LoggerService } from './services/logger.service';
import { GrowlerModule } from './growler/growler.module';


@NgModule({
 imports: [ RouterModule, GrowlerModule ],
 declarations: [ NavBarComponent ],
 exports: [ NavBarComponent, GrowlerModule ],
 providers: [ DataService, FilterService, LoggerService]
})
export class CoreModule { }