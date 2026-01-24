import "./App.css";
import useLibrary from "./components/constant";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	Dialog,
	DialogTitle,
	DialogTrigger,
	DialogHeader,
	DialogContent,
	DialogFooter,
	DialogClose,
} from "./components/ui/dialog";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { Button } from "./components/ui/button";

import { Ellipsis, TrashIcon } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuTrigger,
	DropdownMenuSeparator,
	DropdownMenuLabel,
} from "./components/ui/dropdown-menu";
import { RadioGroup, RadioGroupItem } from "./components/ui/radio-group";
import { useState } from "react";

function App() {
	const { book, changeStatus, addNewbook, deleteBook } = useLibrary();
	const [open, setOpen] = useState(false);
	function handleSubmit(e: any) {
		e.preventDefault();

		const formData = new FormData(e.target);
		const data = Object.fromEntries(formData);
		const title = data.title as string;
		const author = data.author as string;
		const pages = data.pages as string;
		const status = data.status as string;
		addNewbook(title, author, pages, status);
		e.target.reset();
		setOpen(false);
	}

	return (
		<main className="min-h-screen max-w-7xl m-auto">
			<header className="p-3 flex justify-end items-center gap-5 mb-10">
				<h1 className="text-3xl font-bold mr-auto">My Library</h1>
				<Dialog open={open} onOpenChange={setOpen}>
					<DialogTrigger asChild>
						<Button variant="outline">Add New Book</Button>
					</DialogTrigger>
					<DialogContent className="sm:max-w-[425px]">
						<form onSubmit={(e) => handleSubmit(e)}>
							<DialogHeader>
								<DialogTitle>Add New Book</DialogTitle>
							</DialogHeader>
							<div className="grid gap-4 my-5">
								<div className="grid gap-3">
									<Label htmlFor="-1">Title</Label>
									<Input id="title-1" name="title" required />
								</div>
								<div className="grid gap-3">
									<Label htmlFor="author-1">Author</Label>
									<Input id="author-1" name="author" required />
								</div>
								<div className="grid gap-3">
									<Label htmlFor="author-1">Pages</Label>
									<Input
										id="pages-1"
										name="pages"
										type="number"
										min={1}
										required
									/>
								</div>
								<fieldset>
									<Label className="my-5">Status</Label>
									<RadioGroup
										className="flex justify-around items-center"
										name="status"
										defaultValue="not-read"
									>
										<div className="flex justify-center items-center gap-2">
											<RadioGroupItem id="nr" value="not-read" />
											<Label htmlFor="nr">Not Read</Label>
										</div>
										<div className="flex justify-center items-center gap-2">
											<RadioGroupItem id="r" value="reading" />
											<Label htmlFor="r">Reading</Label>
										</div>
										<div className="flex justify-center items-center gap-2">
											<RadioGroupItem id="c" value="completed" />
											<Label htmlFor="c">Completed</Label>
										</div>
									</RadioGroup>
								</fieldset>
							</div>

							<DialogFooter>
								<DialogClose asChild>
									<Button variant="outline">Cancel</Button>
								</DialogClose>
								<Button type="submit">Submit</Button>
							</DialogFooter>
						</form>
					</DialogContent>
				</Dialog>
			</header>
			<Table className="md:max-w-8/12 lg:max-w-10/12 m-auto text-sm md:text-lg">
				<TableCaption>
					A personal library to keep track of books you have read.
				</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead>Title</TableHead>
						<TableHead>Author</TableHead>
						<TableHead>Pages</TableHead>
						<TableHead>Status</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{book?.map((item: any) => (
						<TableRow key={item.id}>
							<TableCell>{item.title}</TableCell>
							<TableCell>{item.author}</TableCell>
							<TableCell>{item.pages}</TableCell>
							<TableCell>{item.status}</TableCell>
							<TableCell>
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Button variant="outline">
											<Ellipsis />
										</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent>
										<DropdownMenuGroup>
											<DropdownMenuLabel>Update Status</DropdownMenuLabel>
											<DropdownMenuRadioGroup
												value={item.status}
												onValueChange={(e: string) => changeStatus(item.id, e)}
											>
												<DropdownMenuRadioItem value="not-read">
													not read
												</DropdownMenuRadioItem>
												<DropdownMenuRadioItem value="reading">
													reading
												</DropdownMenuRadioItem>
												<DropdownMenuRadioItem value="completed">
													completed
												</DropdownMenuRadioItem>
											</DropdownMenuRadioGroup>
										</DropdownMenuGroup>
										<DropdownMenuSeparator />
										<DropdownMenuGroup>
											<DropdownMenuItem
												variant="destructive"
												onClick={() => deleteBook(item.id)}
											>
												<TrashIcon />
												Delete
											</DropdownMenuItem>
										</DropdownMenuGroup>
									</DropdownMenuContent>
								</DropdownMenu>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</main>
	);
}

export default App;
