import { MiscService } from './misc.service';
export declare class MiscController {
    private miscService;
    constructor(miscService: MiscService);
    getFilters(): Promise<{
        names: string[];
        tournaments: any[];
    }>;
}
