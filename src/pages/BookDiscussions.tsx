import { useState, useEffect } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Loader2, Search, MessageSquare } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

interface Book {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    imageLinks?: {
      thumbnail: string;
    };
  };
}

interface Discussion {
  id: number;
  book_id: string;
  title: string;
  author: string | null;
  cover_url: string | null;
  created_at: string;
}

const BookDiscussions = () => {
  const session = useSession();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Book[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const { data: discussions, isLoading: isLoadingDiscussions } = useQuery({
    queryKey: ["discussions"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("book_discussions")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Discussion[];
    },
  });

  useEffect(() => {
    const searchBooks = async () => {
      if (!searchQuery.trim()) {
        setSearchResults([]);
        return;
      }

      setIsSearching(true);
      try {
        const response = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
            searchQuery
          )}&maxResults=5`
        );
        const data = await response.json();
        setSearchResults(data.items || []);
      } catch (error) {
        console.error("Error searching books:", error);
        toast({
          title: "Error",
          description: "Failed to search books. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsSearching(false);
      }
    };

    const debounceTimeout = setTimeout(searchBooks, 500);
    return () => clearTimeout(debounceTimeout);
  }, [searchQuery, toast]);

  const handleCreateDiscussion = async (book: Book) => {
    try {
      const { data: existingDiscussion } = await supabase
        .from("book_discussions")
        .select("*")
        .eq("book_id", book.id)
        .single();

      if (existingDiscussion) {
        toast({
          title: "Discussion exists",
          description: "A discussion for this book already exists.",
        });
        return;
      }

      const { error } = await supabase.from("book_discussions").insert({
        book_id: book.id,
        title: book.volumeInfo.title,
        author: book.volumeInfo.authors?.[0] || null,
        cover_url: book.volumeInfo.imageLinks?.thumbnail || null,
        created_by: session?.user?.id,
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Discussion room created successfully!",
      });
      setSearchQuery("");
      setSearchResults([]);
    } catch (error) {
      console.error("Error creating discussion:", error);
      toast({
        title: "Error",
        description: "Failed to create discussion room. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Book Discussions</h1>

      <div className="mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Search for a book to start a discussion..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {isSearching && (
          <div className="flex items-center justify-center p-4">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        )}

        {searchResults.length > 0 && (
          <div className="mt-4 space-y-4">
            {searchResults.map((book) => (
              <Card key={book.id} className="p-4 flex items-center gap-4">
                {book.volumeInfo.imageLinks?.thumbnail && (
                  <img
                    src={book.volumeInfo.imageLinks.thumbnail}
                    alt={book.volumeInfo.title}
                    className="w-16 h-24 object-cover"
                  />
                )}
                <div className="flex-grow">
                  <h3 className="font-semibold">{book.volumeInfo.title}</h3>
                  {book.volumeInfo.authors && (
                    <p className="text-sm text-gray-600">
                      by {book.volumeInfo.authors.join(", ")}
                    </p>
                  )}
                </div>
                <Button onClick={() => handleCreateDiscussion(book)}>
                  Start Discussion
                </Button>
              </Card>
            ))}
          </div>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {isLoadingDiscussions ? (
          <div className="col-span-full flex justify-center p-8">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : (
          discussions?.map((discussion) => (
            <Card key={discussion.id} className="p-4">
              <div className="flex gap-4">
                {discussion.cover_url && (
                  <img
                    src={discussion.cover_url}
                    alt={discussion.title}
                    className="w-20 h-28 object-cover"
                  />
                )}
                <div>
                  <h3 className="font-semibold">{discussion.title}</h3>
                  {discussion.author && (
                    <p className="text-sm text-gray-600">by {discussion.author}</p>
                  )}
                  <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                    <MessageSquare className="h-4 w-4" />
                    <span>Join discussion</span>
                  </div>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default BookDiscussions;