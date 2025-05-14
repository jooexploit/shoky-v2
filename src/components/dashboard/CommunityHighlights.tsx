
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { MessageSquare, ThumbsUp } from 'lucide-react';
import { communityPosts } from '@/lib/mockData';
import { formatRelativeTime } from '@/lib/utils';

export function CommunityHighlights() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold">Community Highlights</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {communityPosts.map((post) => (
            <div key={post.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Avatar>
                    <AvatarImage src={post.avatar} alt={post.author} />
                    <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{post.author}</p>
                    <p className="text-xs text-muted-foreground">{post.course}</p>
                  </div>
                </div>
                <time className="text-xs text-muted-foreground">
                  {formatRelativeTime(post.date)}
                </time>
              </div>
              <p className="text-sm">{post.content}</p>
              <div className="flex items-center gap-4 pt-1">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <ThumbsUp className="h-3.5 w-3.5" />
                  <span>{post.likes}</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <MessageSquare className="h-3.5 w-3.5" />
                  <span>{post.comments}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
