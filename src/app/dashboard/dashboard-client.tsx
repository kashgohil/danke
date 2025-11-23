'use client';

import { Button } from '@/components/ui/button';
import { Footer } from '@/components/ui/footer';
import { apiRequest, useApiErrorHandler } from '@/lib/api-error-handler';
import { formatDistanceToNow } from 'date-fns';
import {
	Calendar,
	Eye,
	Heart,
	MessageSquare,
	Paperclip,
	Plus,
	Settings,
	Sparkles,
	TrendingUp,
	User,
} from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface UserBoard {
	id: string;
	title: string;
	recipientName: string;
	boardType: string;
	createdAt: string;
	viewToken: string;
	postCount: number;
}

interface UserPost {
	id: string;
	content: any;
	mediaUrls?: string[];
	createdAt: string;
	boardId: string;
	boardTitle: string;
	recipientName: string;
	viewToken: string;
	isAnonymous?: boolean;
	anonymousName?: string;
}

function DashboardSkeleton() {
	return (
		<div className="min-h-screen bg-gray-50">
			<div className="container-default section-padding py-12">
				<div className="text-center space-y-4 mb-12">
					<div className="h-12 bg-gray-200 rounded-lg animate-pulse w-64 mx-auto" />
					<div className="h-6 bg-gray-200 rounded-lg animate-pulse w-96 mx-auto" />
				</div>

				<div className="grid md:grid-cols-3 gap-6 mb-12">
					{[1, 2, 3].map((i) => (
						<div key={i} className="bg-white border border-gray-200 rounded-2xl p-8">
							<div className="h-6 bg-gray-200 rounded animate-pulse w-24 mb-4" />
							<div className="h-10 bg-gray-200 rounded animate-pulse w-16" />
						</div>
					))}
				</div>

				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
					{[1, 2, 3, 4, 5, 6].map((i) => (
						<div key={i} className="bg-white border border-gray-200 rounded-2xl p-8 h-48">
							<div className="h-6 bg-gray-200 rounded animate-pulse w-3/4 mb-2" />
							<div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export function DashboardClient() {
	const [boards, setBoards] = useState<UserBoard[]>([]);
	const [posts, setPosts] = useState<UserPost[]>([]);
	const [loading, setLoading] = useState(true);
	const [activeTab, setActiveTab] = useState<'boards' | 'posts'>('boards');
	const { handleError } = useApiErrorHandler();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const [boardsData, postsData] = await Promise.all([
					apiRequest('/api/user/boards'),
					apiRequest('/api/user/posts'),
				]);

				setBoards(boardsData || []);
				setPosts(postsData || []);
			} catch (error) {
				console.error('Error fetching dashboard data:', error);
				handleError(error);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [handleError]);

	const getContentPreview = (content: any): string => {
		if (typeof content === 'string') {
			const tempDiv = document.createElement('div');
			tempDiv.innerHTML = content;
			const textContent = tempDiv.textContent || tempDiv.innerText || '';
			return textContent;
		}
		if (content?.ops) {
			return content.ops
				.map((op: any) => (typeof op.insert === 'string' ? op.insert : ''))
				.join('')
				.slice(0, 100);
		}
		return 'Post content';
	};

	const totalPosts = boards.reduce((sum, board) => sum + board.postCount, 0);

	if (loading) {
		return <DashboardSkeleton />;
	}

	return (
		<div className="min-h-screen bg-gray-50 flex flex-col">
			<div className="container-default section-padding py-12 flex-1">
				{/* Header */}
				<div className="text-center mb-12 animate-in">
					<div className="inline-flex items-center gap-2 bg-white border border-gray-200 px-6 py-3 rounded-full text-sm font-medium mb-6 shadow-sm">
						<Sparkles className="w-4 h-4 text-purple-600" />
						<span className="text-gray-900">Your appreciation hub</span>
					</div>
					<h1 className="mb-4 text-gray-900">
						<span className="bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
							Dashboard
						</span>
					</h1>
					<p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
						Manage your boards and track your contributions
					</p>
					<Link href="/create-board">
						<Button size="lg" className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white border-0 shadow-lg hover:shadow-xl transition-all">
							<Plus className="w-5 h-5 mr-2" />
							Create New Board
						</Button>
					</Link>
				</div>

				{/* Stats Cards */}
				<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 animate-in-delay-1">
					<div className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
						<div className="flex items-start justify-between mb-4">
							<div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-md">
								<Heart className="w-6 h-6 text-white" />
							</div>
							<div className="text-sm text-gray-500">Total</div>
						</div>
						<div className="space-y-1">
							<p className="text-4xl font-bold text-gray-900">{boards.length}</p>
							<p className="text-sm text-gray-600">Boards Created</p>
						</div>
					</div>

					<div className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
						<div className="flex items-start justify-between mb-4">
							<div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-rose-500 flex items-center justify-center shadow-md">
								<MessageSquare className="w-6 h-6 text-white" />
							</div>
							<div className="text-sm text-gray-500">Received</div>
						</div>
						<div className="space-y-1">
							<p className="text-4xl font-bold text-gray-900">{totalPosts}</p>
							<p className="text-sm text-gray-600">Total Posts</p>
						</div>
					</div>

					<div className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 sm:col-span-2 lg:col-span-1">
						<div className="flex items-start justify-between mb-4">
							<div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-md">
								<TrendingUp className="w-6 h-6 text-white" />
							</div>
							<div className="text-sm text-gray-500">Shared</div>
						</div>
						<div className="space-y-1">
							<p className="text-4xl font-bold text-gray-900">{posts.length}</p>
							<p className="text-sm text-gray-600">Contributions Made</p>
						</div>
					</div>
				</div>

				{/* Tab Navigation */}
				<div className="flex justify-center mb-8 animate-in-delay-2">
					<div className="bg-white border border-gray-200 p-1.5 rounded-2xl inline-flex shadow-sm">
						<button
							onClick={() => setActiveTab('boards')}
							className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
								activeTab === 'boards'
									? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-md'
									: 'text-gray-600 hover:text-gray-900'
							}`}
						>
							<span className="flex items-center gap-2">
								<Heart className="w-4 h-4" />
								My Boards ({boards.length})
							</span>
						</button>
						<button
							onClick={() => setActiveTab('posts')}
							className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
								activeTab === 'posts'
									? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-md'
									: 'text-gray-600 hover:text-gray-900'
							}`}
						>
							<span className="flex items-center gap-2">
								<MessageSquare className="w-4 h-4" />
								My Posts ({posts.length})
							</span>
						</button>
					</div>
				</div>

				{/* Boards Tab */}
				{activeTab === 'boards' && (
					<div className="space-y-8 animate-in-delay-3">
						{boards.length === 0 ? (
							<div className="bg-white border border-gray-200 rounded-3xl p-16 text-center shadow-sm">
								<div className="w-20 h-20 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-6">
									<Heart className="w-10 h-10 text-purple-600" />
								</div>
								<h3 className="text-2xl font-bold text-gray-900 mb-3">No boards yet</h3>
								<p className="text-gray-600 mb-8 max-w-md mx-auto">
									Create your first appreciation board and start collecting beautiful messages
								</p>
								<Link href="/create-board">
									<Button size="lg" className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white border-0 shadow-lg hover:shadow-xl transition-all">
										<Plus className="w-5 h-5 mr-2" />
										Create Your First Board
									</Button>
								</Link>
							</div>
						) : (
							<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
								{boards.map((board, idx) => (
									<div
										key={board.id}
										className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
										style={{
											animation: `fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${idx * 0.05}s forwards`,
											opacity: 0,
										}}
									>
										<div className="flex flex-col h-full">
											<div className="flex-1 mb-6">
												<div className="flex items-start justify-between mb-3">
													<div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold shadow-sm">
														{board.boardType.charAt(0).toUpperCase()}
													</div>
													<span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
														{board.boardType}
													</span>
												</div>
												<h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{board.title}</h3>
												<p className="text-sm text-gray-600">For {board.recipientName}</p>
											</div>

											<div className="space-y-4">
												<div className="flex items-center justify-between text-sm text-gray-600">
													<div className="flex items-center gap-1.5">
														<MessageSquare className="w-4 h-4" />
														<span>{board.postCount} posts</span>
													</div>
													<div className="flex items-center gap-1.5">
														<Calendar className="w-4 h-4" />
														<span>
															{formatDistanceToNow(new Date(board.createdAt), {
																addSuffix: true,
															})}
														</span>
													</div>
												</div>

												<div className="flex gap-2">
													<Link href={`/boards/${board.id}`} className="flex-1">
														<Button
															variant="outline"
															size="sm"
															className="w-full bg-white border-gray-300 text-gray-900 hover:bg-gray-50"
														>
															<Eye className="w-4 h-4 mr-2" />
															View
														</Button>
													</Link>
													<Link href={`/boards/${board.id}/manage`} className="flex-1">
														<Button size="sm" className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white border-0">
															<Settings className="w-4 h-4 mr-2" />
															Manage
														</Button>
													</Link>
												</div>
											</div>
										</div>
									</div>
								))}
							</div>
						)}
					</div>
				)}

				{/* Posts Tab */}
				{activeTab === 'posts' && (
					<div className="space-y-8 animate-in-delay-3">
						{posts.length === 0 ? (
							<div className="bg-white border border-gray-200 rounded-3xl p-16 text-center shadow-sm">
								<div className="w-20 h-20 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-6">
									<MessageSquare className="w-10 h-10 text-orange-600" />
								</div>
								<h3 className="text-2xl font-bold text-gray-900 mb-3">No posts yet</h3>
								<p className="text-gray-600 max-w-md mx-auto">
									Start contributing to appreciation boards to see your posts here
								</p>
							</div>
						) : (
							<div className="grid gap-6">
								{posts.map((post, idx) => (
									<div
										key={post.id}
										className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
										style={{
											animation: `fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${idx * 0.05}s forwards`,
											opacity: 0,
										}}
									>
										<div className="space-y-4">
											<div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
												<div className="flex-1">
													<Link
														href={`/boards/${post.viewToken}`}
														className="text-lg font-semibold text-gray-900 hover:text-purple-600 transition-colors line-clamp-1"
													>
														{post.boardTitle}
													</Link>
													<p className="text-sm text-gray-600">
														For {post.recipientName}
													</p>
												</div>
												<div className="flex items-center gap-2 text-xs text-gray-500">
													<Calendar className="w-3 h-3" />
													{formatDistanceToNow(new Date(post.createdAt), {
														addSuffix: true,
													})}
												</div>
											</div>

											<div className="text-sm text-gray-700 line-clamp-3">
												{getContentPreview(post.content)}
											</div>

											<div className="flex flex-wrap items-center gap-4 text-xs">
												{post.mediaUrls && post.mediaUrls.length > 0 && (
													<div className="flex items-center gap-1.5 text-gray-600">
														<Paperclip className="w-3 h-3" />
														<span>
															{post.mediaUrls.length} attachment
															{post.mediaUrls.length > 1 ? 's' : ''}
														</span>
													</div>
												)}
												{post.isAnonymous && (
													<div className="flex items-center gap-1.5 text-purple-600">
														<User className="w-3 h-3" />
														<span>
															Posted anonymously
															{post.anonymousName && ` as "${post.anonymousName}"`}
														</span>
													</div>
												)}
											</div>

											<Link href={`/boards/${post.boardId}`}>
												<Button variant="outline" size="sm" className="bg-white border-gray-300 text-gray-900 hover:bg-gray-50">
													<Eye className="w-4 h-4 mr-2" />
													View Board
												</Button>
											</Link>
										</div>
									</div>
								))}
							</div>
						)}
					</div>
				)}
			</div>

			{/* Footer - Full Width */}
			<div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] mt-auto">
				<Footer />
			</div>
		</div>
	);
}
