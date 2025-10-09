import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentShipmentsTable } from './recent-shipments-table';

describe('RecentShipmentsTable', () => {
  let component: RecentShipmentsTable;
  let fixture: ComponentFixture<RecentShipmentsTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecentShipmentsTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecentShipmentsTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
