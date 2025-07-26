"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createBoardSchema, type CreateBoardSchema } from "@/lib/validations/board";
import { AlertCircle, ArrowRight, Edit3, Sparkles, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface BoardCreationFormProps {
	onSuccess?: (board: any) => void;
}

export function BoardCreationForm({ onSuccess }: BoardCreationFormProps) {
	const router = useRouter();
	const [formData, setFormData] = useState<CreateBoardSchema>({
		title: "",
		recipientName: "",
	});
	const [errors, setErrors] = useState<Record<string, string>>({});
	const [isLoading, setIsLoading] = useState(false);

	const handleInputChange = (field: keyof CreateBoardSchema, value: string) => {
		setFormData((prev) => ({ ...prev, [field]: value }));

		if (errors[field]) {
			setErrors((prev) => ({ ...prev, [field]: "" }));
		}
	};

	const validateForm = (): boolean => {
		try {
			createBoardSchema.parse(formData);
			setErrors({});
			return true;
		} catch (error: any) {
			const newErrors: Record<string, string> = {};

			if (error.errors) {
				error.errors.forEach((err: any) => {
					if (err.path && err.path.length > 0) {
						newErrors[err.path[0]] = err.message;
					}
				});
			}

			setErrors(newErrors);
			return false;
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!validateForm()) {
			return;
		}

		setIsLoading(true);

		try {
			const response = await fetch("/api/boards", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.error || "Failed to create board");
			}

			setFormData({ title: "", recipientName: "" });

			if (onSuccess) {
				onSuccess(data.board);
			} else {
				router.push(`/boards/${data.board.id}/manage`);
			}
		} catch (error) {
			console.error("Error creating board:", error);
			setErrors({
				submit: error instanceof Error ? error.message : "Failed to create board",
			});
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="w-full max-w-2xl mx-auto">
			<Card className="border-0 shadow-lg overflow-hidden">
				<CardHeader className="bg-gradient-to-r from-primary to-secondary p-6 text-primary-foreground">
					<div className="flex items-center gap-3">
						<div className="w-10 h-10 bg-primary-foreground/20 rounded-lg flex items-center justify-center">
							<Sparkles className="w-5 h-5" />
						</div>
						<div>
							<CardTitle className="text-xl text-primary-foreground">Create Danke Board</CardTitle>
							<CardDescription className="text-primary-foreground/80">
								Start collecting heartfelt messages for someone special
							</CardDescription>
						</div>
					</div>
				</CardHeader>

				<CardContent className="p-8">
					<form
						onSubmit={handleSubmit}
						className="space-y-6"
					>
						<div className="space-y-4">
							<div className="space-y-2">
								<Label
									htmlFor="title"
									className="flex items-center gap-2"
								>
									<Edit3 className="w-4 h-4 text-primary" />
									Board Title
									<span className="text-destructive">*</span>
								</Label>
								<Input
									id="title"
									type="text"
									value={formData.title}
									onChange={(e) => handleInputChange("title", e.target.value)}
									placeholder="e.g., Sarah's Birthday Celebration"
									error={!!errors.title}
									disabled={isLoading}
								/>
								{errors.title && (
									<div className="flex items-center gap-2 text-sm text-destructive">
										<AlertCircle className="h-4 w-4" />
										<span>{errors.title}</span>
									</div>
								)}
							</div>

							<div className="space-y-2">
								<Label
									htmlFor="recipientName"
									className="flex items-center gap-2"
								>
									<Users className="w-4 h-4 text-secondary" />
									Recipient Name
									<span className="text-destructive">*</span>
								</Label>
								<Input
									id="recipientName"
									type="text"
									value={formData.recipientName}
									onChange={(e) => handleInputChange("recipientName", e.target.value)}
									placeholder="e.g., Sarah Johnson"
									error={!!errors.recipientName}
									disabled={isLoading}
								/>
								{errors.recipientName && (
									<div className="flex items-center gap-2 text-sm text-destructive">
										<AlertCircle className="h-4 w-4" />
										<span>{errors.recipientName}</span>
									</div>
								)}
							</div>
						</div>

						{errors.submit && (
							<div className="flex items-center gap-2 p-3 rounded-md bg-destructive/10 border border-destructive/20">
								<AlertCircle className="h-4 w-4 text-destructive flex-shrink-0" />
								<span className="text-sm text-destructive">{errors.submit}</span>
							</div>
						)}

						<div className="pt-4">
							<Button
								type="submit"
								size="lg"
								className="w-full"
								disabled={isLoading}
							>
								{isLoading ? (
									<div className="flex items-center gap-2">
										<div className="w-5 h-5 border-2 border-current/30 border-t-current rounded-full animate-spin"></div>
										Creating Board...
									</div>
								) : (
									<div className="flex items-center gap-2">
										Create Board
										<ArrowRight className="w-5 h-5" />
									</div>
								)}
							</Button>
						</div>

						<div className="text-center">
							<p className="text-sm text-muted-foreground">
								Your board will be created with unique sharing links for viewing and posting
							</p>
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
