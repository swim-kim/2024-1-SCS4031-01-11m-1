export class ReportListDto{
  // 레포트id, 날짜, 상품명, 중요도
  id: string;
  productName: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(id: string, productNama: string, createdAt: Date, updatedAt: Date){
    this.id = id;
    this.productName = productNama;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static createNew(id: string, productNama: string, createdAt: Date, updatedAt: Date){
    return new ReportListDto(id, productNama, createdAt, updatedAt);
  };
}