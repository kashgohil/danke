'use client';

import { PostContent } from '@/components/posts/post-content';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MasonryLayout } from '@/components/ui/masonry-layout';
import { UserAvatar } from '@/components/ui/user-avatar';
import { usePostEdit } from '@/contexts/post-edit-context';
import { apiRequest, useApiErrorHandler } from '@/lib/api-error-handler';
import {
	generateCardStyle,
	generateGradientStyle,
	getContrastTextStyles,
	getTextColors,
} from '@/lib/gradient-utils';
import { useAuth } from '@clerk/nextjs';
import {
	Calendar,
	Edit2,
	Heart,
	Loader2,
	MessageCircle,
	Play,
	Settings,
	Sparkles,
	Trash2,
	User,
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { PostModerationControls } from '../posts/post-moderation-controls';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { MediaCarousel } from '../ui/media-carousel';
import { Slideshow } from '../ui/slideshow';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '../ui/tooltip';

export interface Board {
	id: string;
	title: string;
	recipientName: string;
	creatorId: string;
	typeConfig?: any;
	createdAt: string;
	updatedAt: string;
}

export interface Post {
	id: string;
	content: string;
	mediaUrls: string[] | null;
	createdAt: string;
	updatedAt: string;
	isAnonymous: boolean;
	anonymousName: string | null;
	moderationStatus: string;
	moderationReason: string | null;
	moderatedBy: string | null;
	moderatedAt: string | null;
	deleteScheduledDate: string | null;
	deleteScheduledBy: string | null;
	isDeleted: boolean;
	creatorId: string;
	boardId: string;
	creator: {
		id: string;
		name: string;
		avatarUrl?: string;
	};
}

interface BoardViewProps {
	board: Board;
	posts: Post[];
	onPostUpdated?: (updatedPost: Post) => void;
	onPostDeleted?: (postId: string) => void;
	isModerator?: boolean;
	isCreator?: boolean;
	onFetchMorePosts?: () => Promise<void>;
	hasMorePosts?: boolean;
	isFetchingMore?: boolean;
}

function PostCard({
	post,
	board,
	onPostUpdated,
	onPostDeleted,
	isModerator,
	isCreator,
}: {
	post: Post;
	board: Board;
	onPostUpdated?: (updatedPost: Post) => void;
	onPostDeleted?: (postId: string) => void;
	isModerator?: boolean;
	isCreator?: boolean;
}) {
	const { userId } = useAuth();
	const { openPostEdit } = usePostEdit();
	const { handleError } = useApiErrorHandler();
	const [isDeleting, setIsDeleting] = useState(false);
	const [showDeleteDialog, setShowDeleteDialog] = useState(false);

	const backgroundColor = (board.typeConfig as any)?.backgroundColor;
	const cardStyle = generateCardStyle(backgroundColor);
	const textColors = getTextColors(backgroundColor);
	const contrastTextStyles = getContrastTextStyles(backgroundColor);

	const isOwnPost = userId === post.creatorId;
	const canEdit = isOwnPost && new Date().getTime() - new Date(post.createdAt).getTime() < 10 * 60 * 1000;
	const canDelete = isOwnPost || isModerator || isCreator;
	const showModerationControls = (isModerator || isCreator) && !isOwnPost;

	const handleDelete = async () => {
		try {
			setIsDeleting(true);
			await apiRequest(`/api/posts/${post.id}`, {
				method: 'DELETE',
			});
			onPostDeleted?.(post.id);
			setShowDeleteDialog(false);
		} catch (error) {
			handleError(error);
		} finally {
			setIsDeleting(false);
		}
	};

	const getMediaType = (url: string): 'image' | 'video' | 'audio' => {
		const extension = url.split('.').pop()?.toLowerCase();
		if (['jpg', 'jpeg', 'png', 'webp', 'gif'].includes(extension || '')) {
			return 'image';
		}
		if (['mp4', 'webm'].includes(extension || '')) {
			return 'video';
		}
		return 'audio';
	};

	const hasMedia = post.mediaUrls && post.mediaUrls.length > 0;

	return (
		<>
			{/* Delete Confirmation Dialog */}
			<Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
				<DialogContent className="bg-white rounded-3xl border border-gray-200 shadow-2xl">
					<DialogHeader>
						<DialogTitle className="text-2xl font-bold text-gray-900">Delete Post</DialogTitle>
					</DialogHeader>
					<div className="space-y-4">
						<p className="text-gray-600">
							Are you sure you want to delete this post? This action cannot be undone.
						</p>
						<div className="flex gap-3 justify-end">
							<Button variant="outline" onClick={() => setShowDeleteDialog(false)} disabled={isDeleting} className="border-gray-300">
								Cancel
							</Button>
							<Button
								variant="destructive"
								onClick={handleDelete}
								disabled={isDeleting}
								className="bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white border-0"
							>
								{isDeleting ? (
									<>
										<Loader2 className="w-4 h-4 mr-2 animate-spin" />
										Deleting...
									</>
								) : (
									<>
										<Trash2 className="w-4 h-4 mr-2" />
										Delete
									</>
								)}
							</Button>
						</div>
					</div>
				</DialogContent>
			</Dialog>

			{/* Post Card */}
			<div className="bg-white border border-gray-200 rounded-3xl p-8 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group animate-in" role="article">
				{/* Media */}
				{hasMedia && (
					<div className="mb-6 -mt-8 -mx-8 rounded-t-3xl overflow-hidden">
						<MediaCarousel mediaUrls={post.mediaUrls!} getMediaType={getMediaType} />
					</div>
				)}

				{/* Header */}
				<div className="flex items-start justify-between mb-6">
					<div className="flex items-center gap-3 flex-1 min-w-0">
						<div className="flex-shrink-0">
							{post.isAnonymous ? (
								<div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white shadow-md">
									<User className="w-6 h-6" />
								</div>
							) : (
								<UserAvatar user={post.creator} size="lg" />
							)}
						</div>
						<div className="flex-1 min-w-0">
							<p className="text-base font-semibold text-gray-900 truncate">
								{post.isAnonymous ? post.anonymousName || 'Anonymous' : post.creator.name || 'Unknown'}
							</p>
							<div className="flex items-center gap-1.5 text-xs text-gray-500">
								<Calendar className="w-3 h-3" />
								<time dateTime={post.createdAt}>
									{new Date(post.createdAt).toLocaleDateString('en-US', {
										month: 'short',
										day: 'numeric',
										year: 'numeric',
									})}
								</time>
							</div>
						</div>
					</div>

					{/* Actions */}
					<div className="flex items-center gap-1">
						{canEdit && (
							<TooltipProvider>
								<Tooltip>
									<TooltipTrigger asChild>
										<Button
											variant="ghost"
											size="sm"
											onClick={() => openPostEdit(post.id)}
											className="h-9 w-9 rounded-full hover:bg-purple-50 hover:text-purple-600"
										>
											<Edit2 className="h-4 w-4" />
										</Button>
									</TooltipTrigger>
									<TooltipContent>Edit post</TooltipContent>
								</Tooltip>
							</TooltipProvider>
						)}
						{!showModerationControls && canDelete && (
							<TooltipProvider>
								<Tooltip>
									<TooltipTrigger asChild>
										<Button
											variant="ghost"
											size="sm"
											onClick={() => setShowDeleteDialog(true)}
											disabled={isDeleting}
											className="h-9 w-9 rounded-full hover:bg-red-50 hover:text-red-600"
										>
											<Trash2 className="h-4 w-4" />
										</Button>
									</TooltipTrigger>
									<TooltipContent>Delete post</TooltipContent>
								</Tooltip>
							</TooltipProvider>
						)}
						{showModerationControls && (
							<PostModerationControls
								textColors={textColors}
								postId={post.id}
								moderationStatus={post.moderationStatus}
								onModerationComplete={() => {
									onPostUpdated?.(post);
								}}
							/>
						)}
					</div>
				</div>

				{/* Content */}
				<div className="prose prose-sm max-w-none text-gray-700">
					<PostContent content={post.content} className="border-0 p-0 min-h-0 text-base leading-relaxed" />
				</div>

				{/* Moderation Status */}
				{post.moderationStatus !== 'approved' && (isModerator || isCreator || isOwnPost) && (
					<div className="mt-6 pt-6 border-t border-gray-200">
						<div
							className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium ${
								post.moderationStatus === 'pending'
									? 'bg-yellow-50 text-yellow-700'
									: post.moderationStatus === 'rejected'
										? 'bg-red-50 text-red-700'
										: 'bg-blue-50 text-blue-700'
							}`}
						>
							<span className="w-2 h-2 rounded-full bg-current animate-pulse"></span>
							{post.moderationStatus === 'pending' && 'Pending Moderation'}
							{post.moderationStatus === 'rejected' && 'Rejected'}
							{post.moderationStatus === 'change_requested' && 'Changes Requested'}
						</div>
						{post.moderationReason && (
							<p className="text-xs text-gray-600 mt-2">Reason: {post.moderationReason}</p>
						)}
					</div>
				)}
			</div>
		</>
	);
}

export function BoardView({
	board,
	posts,
	onPostUpdated,
	onPostDeleted,
	isModerator,
	isCreator,
	onFetchMorePosts,
	hasMorePosts,
	isFetchingMore,
}: BoardViewProps) {
	const [slideshowOpen, setSlideshowOpen] = useState(false);
	const backgroundColor = (board.typeConfig as any)?.backgroundColor;
	const textColors = getTextColors(backgroundColor);
	const contrastTextStyles = getContrastTextStyles(backgroundColor);

	const content = () => {
		if (posts.length === 0) {
			return (
				<div className="bg-white border border-gray-200 rounded-3xl p-16 text-center shadow-lg mx-auto max-w-2xl">
					<div className="w-20 h-20 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-6">
						<MessageCircle className="w-10 h-10 text-purple-600" />
					</div>
					<h3 className="text-2xl font-bold text-gray-900 mb-3">No messages yet</h3>
					<p className="text-gray-600 max-w-md mx-auto">
						Be the first to share your appreciation for{' '}
						<span className="font-semibold text-gray-900">{board.recipientName}</span>
					</p>
				</div>
			);
		}

		return (
			<section aria-label="Appreciation messages">
				<MasonryLayout className="w-full" minColumnWidth={320} gap={24}>
					{posts.map((post, idx) => (
						<div
							key={post.id}
							style={{
								animation: `fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${idx * 0.03}s forwards`,
								opacity: 0,
							}}
						>
							<PostCard
								post={post}
								board={board}
								onPostUpdated={onPostUpdated}
								onPostDeleted={onPostDeleted}
								isModerator={isModerator}
								isCreator={isCreator}
							/>
						</div>
					))}
				</MasonryLayout>
			</section>
		);
	};

	return (
		<div className="relative min-h-screen bg-gray-50">
			{/* Header */}
			<header className="relative section-padding py-16 md:py-24 text-center">
				<div className="container-narrow">
					<div className="inline-flex items-center gap-2 bg-white border border-purple-200 px-6 py-3 rounded-full text-sm font-medium mb-8 animate-in shadow-sm">
						<Heart className="w-4 h-4 text-purple-600" />
						<span className="text-gray-900">Messages of appreciation</span>
					</div>

					<h1 className="mb-6 animate-in-delay-1 text-gray-900">
						<span className="bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">{board.title}</span>
					</h1>

					<p className="text-xl md:text-2xl text-gray-600 mb-10 animate-in-delay-2 text-balance">
						Heartfelt messages and memories for{' '}
						<span className="font-semibold text-gray-900">{board.recipientName}</span>
					</p>

					<div className="flex flex-wrap items-center justify-center gap-4 animate-in-delay-3">
						{posts.length > 0 && (
							<Button
								onClick={() => setSlideshowOpen(true)}
								size="lg"
								className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white border-0 shadow-lg hover:shadow-xl transition-all"
							>
								<Play className="w-5 h-5 mr-2" />
								Start Slideshow
							</Button>
						)}

						{(isModerator || isCreator) && (
							<Link href={`/boards/${board.id}/manage`}>
								<Button variant="outline" size="lg" className="bg-white border-gray-300 text-gray-900 hover:bg-gray-50">
									<Settings className="w-5 h-5 mr-2" />
									Manage Board
								</Button>
							</Link>
						)}
					</div>

					{/* Stats */}
					{posts.length > 0 && (
						<div className="mt-12 flex items-center justify-center gap-8 text-sm text-gray-600 animate-in-delay-4">
							<div className="flex items-center gap-2">
								<MessageCircle className="w-4 h-4 text-purple-600" />
								<span>
									{posts.length} {posts.length === 1 ? 'message' : 'messages'}
								</span>
							</div>
							<div className="flex items-center gap-2">
								<Sparkles className="w-4 h-4 text-orange-500" />
								<span>Shared with love</span>
							</div>
						</div>
					)}
				</div>
			</header>

			{/* Main Content */}
			<main className="relative section-padding pb-20">
				<div className="container-wide">{content()}</div>

				{/* Load More */}
				{hasMorePosts && (
					<div className="flex justify-center mt-12">
						<Button
							onClick={onFetchMorePosts}
							disabled={isFetchingMore}
							size="lg"
							variant="outline"
							className="bg-white border-gray-300 text-gray-900 hover:bg-gray-50 min-w-[200px] shadow-sm"
						>
							{isFetchingMore ? (
								<>
									<Loader2 className="w-5 h-5 mr-2 animate-spin" />
									Loading...
								</>
							) : (
								<>
									<MessageCircle className="w-5 h-5 mr-2" />
									Load More Messages
								</>
							)}
						</Button>
					</div>
				)}
			</main>

			{/* Slideshow */}
			<Slideshow
				posts={posts.map((post) => ({
					id: post.id,
					content: post.content,
					mediaUrls: post.mediaUrls || [],
					creatorId: post.isAnonymous ? post.anonymousName || 'Anonymous' : post.creator.name,
					isAnonymous: post.isAnonymous,
					anonymousName: post.anonymousName || undefined,
					createdAt: post.createdAt,
				}))}
				isOpen={slideshowOpen}
				onClose={() => setSlideshowOpen(false)}
				backgroundColor={backgroundColor}
				onFetchMorePosts={onFetchMorePosts}
				hasMorePosts={hasMorePosts}
				isFetchingMore={isFetchingMore}
			/>
		</div>
	);
}
