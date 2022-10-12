interface CreateBoardBody {
  name: string;
  description?: string;
  isPublic?: boolean;
}
interface CreateIdeaBody {
  title: string;
  description?: string;
  boardId: string;
}
