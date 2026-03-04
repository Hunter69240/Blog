import { fireEvent, render,screen} from "@testing-library/react";
import { expect, vi } from "vitest";
import SelectedArticle from "./SelectedArticle";
import { useQuery } from "@tanstack/react-query";

const mockNavigate = vi.fn();
vi.mock("react-router-dom", () => ({
  useParams: () => ({ slug: "test-blog" }),
  useNavigate: () => mockNavigate,
}));

vi.mock("@tanstack/react-query",()=>({
    useQuery:vi.fn()
   
}))


describe("SelectedArticle ",()=>{
    afterEach(() => {
        vi.clearAllMocks();
    });

    it("Selected article Loading",()=>{
        useQuery.mockReturnValue({
            data:null,
            error:null,
            isLoading:true
        })
        render(<SelectedArticle/>)
        
        expect(screen.getByRole("progressbar")).toBeInTheDocument()
    })

    
    it("Error loading",()=>{
        useQuery.mockReturnValue({
            data:null,
            error:true,
            isLoading:false
        })

        render(<SelectedArticle/>)

        expect(screen.getByRole("alert")).toBeInTheDocument()
    })

   

    it("Data loading",()=>{
        useQuery.mockReturnValue({
            data:{
                blog:{
                    title:"test",
                    tag:'test tag',
                    content:"test content",
                    createdAt:"2026-03-02 12:33:25.300714"
                }
            },
            error:false,
            isLoading:false
        })

        render(<SelectedArticle/>)
        expect(screen.getByText("test")).toBeInTheDocument()
        expect(screen.getByText(/test tag/i)).toBeInTheDocument()
        expect(screen.getByText("test content")).toBeInTheDocument();
        expect(screen.getByText(/02 Mar 2026 /i)).toBeInTheDocument();
    })

    it("Blog not found",()=>{
        useQuery.mockReturnValue({
            data:{},
            error:false,
            isLoading:false
        })

        render(<SelectedArticle/>)
        expect(screen.getByText("Blog not found")).toBeInTheDocument()
    })

    it("Back button",()=>{
        useQuery.mockReturnValue({
            data:{
                blog:{
                    title:"test",
                    tag:'test tag',
                    content:"test content",
                    createdAt:"2026-03-02 12:33:25.300714"
                }
            },
            error:false,
            isLoading:false
        })
        render(<SelectedArticle/>)
        const button=screen.getByRole("button",{name:/back to articles/i})
        fireEvent.click(button)
        expect(mockNavigate).toHaveBeenCalledWith("/")
    })

    it("Renders markdown component",()=>{
        const markdown=
        `# Intro\nrandom\n## level2\n### level3`
        useQuery.mockReturnValue({
            data:{
                blog:{
                    title:"Random",
                    tag:'random tag',
                    content:markdown,
                    created_at:"2026-03-02 12:33:25.300714"
                },    
            },
            error:false,
            isLoading:false
        })

        render(<SelectedArticle/>)
        const heading1=screen.getByRole("heading",{name:/intro/i})
        const heading2=screen.getByRole("heading",{name:/level2/i})
        const heading3=screen.getByRole("heading",{name:/level3/i})

        expect(heading1).toBeInTheDocument()
        expect(heading2).toBeInTheDocument()
        expect(heading3).toBeInTheDocument()
    })
})