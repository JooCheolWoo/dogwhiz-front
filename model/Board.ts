export interface BoardDto {
    id: number;
    writer: string;
    writerImageUrl: string;
    category: string;
    subCategory: string;
    pinToTop: boolean;
    title: string;
    content: string;
    likeCount: number;
    viewCount: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
} 