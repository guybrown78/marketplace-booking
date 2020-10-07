import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { CourseModel, CourseSupplierModel } from '../../common/models/courses.model'

@Component({
  selector: 'supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent {
	logoImageClass: string = "evaluate";
	@ViewChild('imgRef') imgRef: ElementRef;

	@Input('courseSupplier') courseSupplier:CourseSupplierModel;

	onSupplierLogoLoaded() {
		if(this.imgRef.nativeElement.width > this.imgRef.nativeElement.height){
			this.logoImageClass = "width-dom";
		}else{
			this.logoImageClass = "height-dom";
		}
	}
}
