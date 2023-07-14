export interface PostDto {
    id: number;
    memberId: number;
    memberNickname: string;
    memberImageUrl: string;
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