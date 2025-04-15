import { PageSizePaginationDto } from "@/common";

export class CustomerListQuery {
    constructor(
        public readonly paginationDto: PageSizePaginationDto,
        public readonly lang: string,
    ) {}
} 