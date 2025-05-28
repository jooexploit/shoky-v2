
import React, { useState, useEffect } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import GPACalculator from '@/components/tools/GPACalculator';
import UnitConverter from '@/components/tools/UnitConverter';
import { 
  StickyNote, 
  ListTodo, 
  Calendar, 
  BookOpen, 
  MoveHorizontal, 
  Plus, 
  X, 
  Edit, 
  Clock, 
  Trash2,
  CalendarDays,
  CheckCircle2,
  FileText,
  FileVideo,
  FileImage,
  Link as LinkIcon,
  Users,
  Calculator
} from 'lucide-react';

type Note = {
  id: string;
  title: string;
  content: string;
  color: string;
  date: string;
};

type TodoPriority = 'low' | 'medium' | 'high' | 'none';

type TodoItem = {
  id: string;
  text: string;
  completed: boolean;
  date: string;
  dueDate?: string;
  priority: TodoPriority;
};

type TodoList = {
  id: string;
  name: string;
  todos: TodoItem[];
  date: string;
};

// Color options for notes with enhanced styling classes
const noteColors = [
  { value: '#FEF3C7', name: 'Yellow', className: 'sticky-note-yellow', textColor: '#713F12' }, // Darker text for yellow
  { value: '#DBEAFE', name: 'Blue', className: 'sticky-note-blue', textColor: '#1E3A8A' }, // Dark blue text
  { value: '#D1FAE5', name: 'Green', className: 'sticky-note-green', textColor: '#14532D' }, // Dark green text
  { value: '#FEE2E2', name: 'Red', className: 'sticky-note-red', textColor: '#7F1D1D' }, // Dark red text
  { value: '#E5E7EB', name: 'Gray', className: 'sticky-note-gray', textColor: '#1F2937' }, // Dark gray text
  { value: '#FCE7F3', name: 'Pink', className: 'sticky-note-pink', textColor: '#831843' }, // Dark pink text
];

// Priority options and their colors
const priorities = [
  { value: 'none', label: 'None', color: '#E5E7EB', textColor: '#1F2937' }, // Gray background, dark gray text
  { value: 'low', label: 'Low', color: '#D1FAE5', textColor: '#14532D' }, // Green background, dark green text
  { value: 'medium', label: 'Medium', color: '#DBEAFE', textColor: '#1E3A8A' }, // Blue background, dark blue text
  { value: 'high', label: 'High', color: '#FEE2E2', textColor: '#7F1D1D' }, // Red background, dark red text
];

const Tools = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [todoLists, setTodoLists] = useState<TodoList[]>([]);
  const [currentTodoList, setCurrentTodoList] = useState<string | null>(null);
  const [newNote, setNewNote] = useState({ title: '', content: '', color: '#FEF3C7' });
  const [newTodoItem, setNewTodoItem] = useState<{ text: string; dueDate: string; priority: TodoPriority }>({ text: '', dueDate: '', priority: 'none' });
  const [newListName, setNewListName] = useState('');
  const [editingNote, setEditingNote] = useState<string | null>(null);
  const [editNoteData, setEditNoteData] = useState({ title: '', content: '', color: '' });
  const [editingTodoItem, setEditingTodoItem] = useState<string | null>(null);
  const [editTodoData, setEditTodoData] = useState<{ text: string; dueDate: string; priority: TodoPriority }>({ text: '', dueDate: '', priority: 'none' });
  const [showTasksDialog, setShowTasksDialog] = useState(false);
  const [selectedList, setSelectedList] = useState<TodoList | null>(null);
  const { toast } = useToast();

  // Initialize with some example data
  useEffect(() => {
    const exampleNotes: Note[] = [
      {
        id: '1',
        title: 'CS101 Key Concepts',
        content: 'Variables, data types, control structures, functions, objects',
        color: '#DBEAFE',
        date: new Date(2025, 3, 15).toISOString(),
      },
      {
        id: '2',
        title: 'Math Formulas',
        content: 'Derivatives: f(x) = x^n => f\'(x) = nx^(n-1)\nIntegrals: ∫x^n dx = (x^(n+1))/(n+1) + C',
        color: '#FEF3C7',
        date: new Date(2025, 3, 10).toISOString(),
      },
      {
        id: '3',
        title: 'Research Paper Ideas',
        content: 'Impact of machine learning on healthcare\nEthical considerations in AI development\nQuantum computing applications',
        color: '#D1FAE5',
        date: new Date(2025, 3, 5).toISOString(),
      }
    ];

    const exampleTodoLists: TodoList[] = [
      {
        id: '1',
        name: 'Homework',
        date: new Date(2025, 3, 1).toISOString(),
        todos: [
          { id: '1-1', text: 'Complete CS101 Assignment', completed: true, date: new Date(2025, 3, 1).toISOString(), dueDate: '2025-04-10', priority: 'high' },
          { id: '1-2', text: 'Read Chapter 5 for History', completed: false, date: new Date(2025, 3, 2).toISOString(), dueDate: '2025-04-12', priority: 'medium' },
          { id: '1-3', text: 'Prepare for Chemistry Lab', completed: false, date: new Date(2025, 3, 3).toISOString(), dueDate: '2025-04-15', priority: 'high' },
        ]
      },
      {
        id: '2',
        name: 'Study Goals',
        date: new Date(2025, 3, 4).toISOString(),
        todos: [
          { id: '2-1', text: 'Review calculus concepts', completed: false, date: new Date(2025, 3, 4).toISOString(), dueDate: '', priority: 'medium' },
          { id: '2-2', text: 'Practice programming problems', completed: true, date: new Date(2025, 3, 5).toISOString(), dueDate: '', priority: 'low' },
        ]
      }
    ];

    if (localStorage.getItem('studentNotes') === null) {
      setNotes(exampleNotes);
      localStorage.setItem('studentNotes', JSON.stringify(exampleNotes));
    } else {
      setNotes(JSON.parse(localStorage.getItem('studentNotes') || '[]'));
    }

    if (localStorage.getItem('studentTodoLists') === null) {
      setTodoLists(exampleTodoLists);
      setCurrentTodoList(exampleTodoLists[0].id);
      localStorage.setItem('studentTodoLists', JSON.stringify(exampleTodoLists));
    } else {
      const savedTodoLists = JSON.parse(localStorage.getItem('studentTodoLists') || '[]');
      setTodoLists(savedTodoLists);
      if (savedTodoLists.length > 0) {
        setCurrentTodoList(savedTodoLists[0].id);
      }
    }
  }, []);

  // Save notes to localStorage whenever they change
  useEffect(() => {
    if (notes.length > 0) {
      localStorage.setItem('studentNotes', JSON.stringify(notes));
    }
  }, [notes]);

  // Save todo lists to localStorage whenever they change
  useEffect(() => {
    if (todoLists.length > 0) {
      localStorage.setItem('studentTodoLists', JSON.stringify(todoLists));
    }
  }, [todoLists]);

  // Handle adding a new note
  const handleAddNote = () => {
    if (newNote.title.trim() === '') {
      toast({
        title: 'Note needs a title',
        description: 'Please enter a title for your note.',
        variant: 'destructive',
      });
      return;
    }

    const note: Note = {
      id: Date.now().toString(),
      title: newNote.title,
      content: newNote.content,
      color: newNote.color,
      date: new Date().toISOString(),
    };

    setNotes([note, ...notes]);
    setNewNote({ title: '', content: '', color: '#FEF3C7' });
    
    toast({
      title: 'Note created',
      description: 'Your note has been saved.',
    });
  };

  // Handle editing a note
  const handleEditNote = (id: string) => {
    const note = notes.find(note => note.id === id);
    if (note) {
      setEditingNote(id);
      setEditNoteData({
        title: note.title,
        content: note.content,
        color: note.color,
      });
    }
  };

  // Handle saving an edited note
  const handleSaveEditedNote = () => {
    if (editingNote === null) return;
    
    if (editNoteData.title.trim() === '') {
      toast({
        title: 'Note needs a title',
        description: 'Please enter a title for your note.',
        variant: 'destructive',
      });
      return;
    }

    const updatedNotes = notes.map(note => 
      note.id === editingNote 
        ? { ...note, title: editNoteData.title, content: editNoteData.content, color: editNoteData.color }
        : note
    );

    setNotes(updatedNotes);
    setEditingNote(null);
    setEditNoteData({ title: '', content: '', color: '' });
    
    toast({
      title: 'Note updated',
      description: 'Your note has been updated.',
    });
  };

  // Handle deleting a note
  const handleDeleteNote = (id: string) => {
    setNotes(notes.filter(note => note.id !== id));
    toast({
      title: 'Note deleted',
      description: 'Your note has been deleted.',
    });
  };

  // Handle adding a new todo list
  const handleAddTodoList = () => {
    if (newListName.trim() === '') {
      toast({
        title: 'List needs a name',
        description: 'Please enter a name for your list.',
        variant: 'destructive',
      });
      return;
    }

    const newList: TodoList = {
      id: Date.now().toString(),
      name: newListName,
      todos: [],
      date: new Date().toISOString(),
    };

    setTodoLists([...todoLists, newList]);
    setNewListName('');
    setCurrentTodoList(newList.id);
    
    toast({
      title: 'List created',
      description: 'Your new list has been created.',
    });
  };

  // Handle adding a new todo item
  const handleAddTodoItem = () => {
    if (!currentTodoList) return;
    
    if (newTodoItem.text.trim() === '') {
      toast({
        title: 'Task cannot be empty',
        description: 'Please enter a task description.',
        variant: 'destructive',
      });
      return;
    }

    const newItem: TodoItem = {
      id: Date.now().toString(),
      text: newTodoItem.text,
      completed: false,
      date: new Date().toISOString(),
      dueDate: newTodoItem.dueDate || undefined,
      priority: newTodoItem.priority,
    };

    const updatedLists = todoLists.map(list => 
      list.id === currentTodoList 
        ? { ...list, todos: [newItem, ...list.todos] }
        : list
    );

    setTodoLists(updatedLists);
    setNewTodoItem({ text: '', dueDate: '', priority: 'none' });
    
    toast({
      title: 'Task added',
      description: 'Your task has been added to the list.',
    });
  };

  // Handle toggling a todo item's completed status
  const handleToggleTodoCompleted = (listId: string, itemId: string) => {
    const updatedLists = todoLists.map(list => 
      list.id === listId 
        ? { 
            ...list, 
            todos: list.todos.map(item => 
              item.id === itemId ? { ...item, completed: !item.completed } : item
            ) 
          }
        : list
    );

    setTodoLists(updatedLists);
  };

  // Handle deleting a todo item
  const handleDeleteTodoItem = (listId: string, itemId: string) => {
    const updatedLists = todoLists.map(list => 
      list.id === listId 
        ? { ...list, todos: list.todos.filter(item => item.id !== itemId) }
        : list
    );

    setTodoLists(updatedLists);
    
    toast({
      title: 'Task deleted',
      description: 'Your task has been removed from the list.',
    });
  };

  // Handle editing a todo item
  const handleEditTodoItem = (listId: string, itemId: string) => {
    const list = todoLists.find(list => list.id === listId);
    if (!list) return;
    
    const item = list.todos.find(todo => todo.id === itemId);
    if (!item) return;
    
    setEditingTodoItem(itemId);
    setEditTodoData({
      text: item.text,
      dueDate: item.dueDate || '',
      priority: item.priority
    });
  };

  // Handle saving an edited todo item
  const handleSaveEditedTodoItem = (listId: string) => {
    if (editingTodoItem === null) return;
    
    if (editTodoData.text.trim() === '') {
      toast({
        title: "Task cannot be empty",
        description: "Please enter a task description.",
        variant: "destructive",
      });
      return;
    }

    const updatedLists = todoLists.map(list => 
      list.id === listId 
        ? { 
            ...list, 
            todos: list.todos.map(item => 
              item.id === editingTodoItem 
                ? { 
                    ...item, 
                    text: editTodoData.text,
                    dueDate: editTodoData.dueDate || undefined,
                    priority: editTodoData.priority
                  } 
                : item
            ) 
          }
        : list
    );

    setTodoLists(updatedLists);
    setEditingTodoItem(null);
    setEditTodoData({ text: '', dueDate: '', priority: 'none' });
    
    toast({
      title: "Task updated",
      description: "Your task has been updated successfully.",
    });
  };

  // Handle deleting a todo list
  const handleDeleteTodoList = (id: string) => {
    setTodoLists(todoLists.filter(list => list.id !== id));
    
    if (currentTodoList === id) {
      setCurrentTodoList(todoLists.length > 1 ? todoLists[0].id : null);
    }
    
    toast({
      title: 'List deleted',
      description: 'Your list has been deleted.',
    });
  };

  // Show tasks dialog for a specific list
  const showTasksForList = (list: TodoList) => {
    setSelectedList(list);
    setShowTasksDialog(true);
  };

  // Get the currently selected todo list
  const getCurrentTodoList = () => {
    return todoLists.find(list => list.id === currentTodoList);
  };

  // Get the priority color for a todo item
  const getPriorityColor = (priority: string) => {
    return priorities.find(p => p.value === priority)?.color || '#E5E7EB';
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  // Get CSS class for note color
  const getNoteColorClass = (colorValue: string) => {
  const color = noteColors.find((color) => color.value === colorValue);
  return {
    className: color?.className || '',
    textColor: color?.textColor || '#000000', // Fallback to black
  };
};

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">Student Tools</h1>
          <p className="text-muted-foreground">Productivity tools to help with your studies</p>
        </div>
        
        <Tabs defaultValue="notes" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="notes" className="flex items-center">
              <StickyNote className="mr-2 h-4 w-4" />
              Sticky Notes
            </TabsTrigger>
            <TabsTrigger value="todos" className="flex items-center">
              <ListTodo className="mr-2 h-4 w-4" />
              To-Do Lists
            </TabsTrigger>
            <TabsTrigger value="calculator" className="flex items-center">
              <Calculator className="mr-2 h-4 w-4" />
              GPA Calculator
            </TabsTrigger>
            <TabsTrigger value="resources" className="flex items-center">
              <BookOpen className="mr-2 h-4 w-4" />
              Resources
            </TabsTrigger>
          </TabsList>
          
          {/* Sticky Notes Section */}
          <TabsContent value="notes" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Create Note Form */}
              <Card className="lg:col-span-4">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Plus className="mr-2 h-4 w-4" />
                    Create Note
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="note-title">Title</Label>
                      <Input 
                        id="note-title"
                        placeholder="Note title" 
                        value={newNote.title}
                        onChange={(e) => setNewNote({...newNote, title: e.target.value})}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="note-content">Content</Label>
                      <Textarea 
                        id="note-content"
                        placeholder="Note content" 
                        rows={5}
                        value={newNote.content}
                        onChange={(e) => setNewNote({...newNote, content: e.target.value})}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Note Color</Label>
                      <div className="flex flex-wrap gap-2">
                        {noteColors.map((color) => (
                          <button
                            key={color.value}
                            type="button"
                            className={`w-8 h-8 rounded-full border-2 shadow-sm transition-all ${newNote.color === color.value ? 'border-primary ring-2 ring-primary/20 scale-110' : 'border-transparent'}`}
                            style={{ backgroundColor: color.value }}
                            onClick={() => setNewNote({...newNote, color: color.value})}
                            title={color.name}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" onClick={handleAddNote}>Create Note</Button>
                </CardFooter>
              </Card>
              
              {/* Notes List */}
<div className="lg:col-span-8">
  <h3 className="text-lg font-medium mb-4 text-foreground">Your Notes</h3>
  
  {notes.length === 0 ? (
    <div className="text-center py-12 border rounded-lg bg-background">
      <StickyNote className="h-12 w-12 mx-auto text-muted-foreground" />
      <p className="mt-4 text-muted-foreground">No notes yet. Create your first note!</p>
    </div>
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {notes.map((note) => {
        const { className, textColor } = getNoteColorClass(note.color);
        return (
          <div 
            key={note.id} 
            className={`rounded-lg border overflow-hidden shadow-sm ${className}`}
            style={{ color: textColor }} // Apply dynamic text color
          >
            {editingNote === note.id ? (
              // Edit mode
              <div className="p-4 space-y-3">
                <Input 
                  value={editNoteData.title}
                  onChange={(e) => setEditNoteData({...editNoteData, title: e.target.value})}
                  className="bg-background text-foreground border-muted"
                />
                
                <Textarea 
                  value={editNoteData.content}
                  onChange={(e) => setEditNoteData({...editNoteData, content: e.target.value})}
                  rows={4}
                  className="bg-background text-foreground border-muted"
                />
                
                <div className="flex flex-wrap gap-2">
                  {noteColors.map((color) => (
                    <button
                      key={color.value}
                      type="button"
                      className={`w-6 h-6 rounded-full border-2 shadow-sm transition-all ${
                        editNoteData.color === color.value 
                          ? 'border-primary ring-2 ring-primary/20 scale-110' 
                          : 'border-transparent'
                      }`}
                      style={{ backgroundColor: color.value }}
                      onClick={() => setEditNoteData({...editNoteData, color: color.value})}
                      title={color.name}
                    />
                  ))}
                </div>
                
                <div className="flex justify-end space-x-2 pt-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => setEditingNote(null)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    size="sm"
                    onClick={handleSaveEditedNote}
                  >
                    Save
                  </Button>
                </div>
              </div>
            ) : (
              // View mode
              <>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold">{note.title}</h3>
                    <div className="flex space-x-1">
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        className="h-6 w-6 hover:bg-background/50"
                        onClick={() => handleEditNote(note.id)}
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        className="h-6 w-6 hover:bg-background/50"
                        onClick={() => handleDeleteNote(note.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="whitespace-pre-line text-sm">
                    {note.content}
                  </div>
                </div>
                
                <div className="bg-background/10 text-xs px-4 py-1.5 text-muted-foreground flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>Created: {formatDate(note.date)}</span>
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  )}
</div>
            </div>
          </TabsContent>
          
          {/* Todo Lists Section */}
          <TabsContent value="todos" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Todo Lists Sidebar */}
              <div className="lg:col-span-3 space-y-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center">
                      <ListTodo className="mr-2 h-4 w-4" />
                      Your Lists
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pb-1">
                    <div className="space-y-2">
                      <Input 
                        placeholder="New list name" 
                        value={newListName}
                        onChange={(e) => setNewListName(e.target.value)}
                      />
                      <Button 
                        size="sm" 
                        className="w-full"
                        onClick={handleAddTodoList}
                      >
                        <Plus className="mr-1 h-4 w-4" />
                        Add List
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                <ScrollArea className="h-[60vh] custom-scrollbar">
                  <div className="space-y-2 pr-4">
                    {todoLists.map((list) => (
                      <div 
                        key={list.id}
                        className={`rounded-lg border p-3 cursor-pointer transition-colors ${currentTodoList === list.id ? 'bg-accent' : 'hover:bg-accent/50'}`}
                        onClick={() => setCurrentTodoList(list.id)}
                      >
                        <div className="flex justify-between items-center">
                          <div className="flex-1 truncate font-medium">{list.name}</div>
                          <div className="flex">
                            <Button 
                              size="icon" 
                              variant="ghost"
                              className="h-7 w-7"
                              onClick={(e) => {
                                e.stopPropagation();
                                showTasksForList(list);
                              }}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              size="icon" 
                              variant="ghost"
                              className="h-7 w-7"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteTodoList(list.id);
                              }}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground flex items-center mt-1 space-x-2">
                          <span>{list.todos.length} tasks</span>
                          <span className="text-muted-foreground/50">•</span>
                          <span>
                            {list.todos.filter(todo => todo.completed).length} completed
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
              
              {/* Todo Items */}
              <div className="lg:col-span-9">
                {currentTodoList ? (
                  <div className="space-y-4">
                    <Card>
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-center">
                          <CardTitle>{getCurrentTodoList()?.name}</CardTitle>
                          <Badge variant="outline" className="text-xs">
                            {getCurrentTodoList()?.todos.filter(todo => todo.completed).length} / {getCurrentTodoList()?.todos.length} completed
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-3">
                        <div className="flex space-x-2">
                          <Input 
                            placeholder="New task" 
                            value={newTodoItem.text}
                            onChange={(e) => setNewTodoItem({...newTodoItem, text: e.target.value})}
                            className="flex-1"
                          />
                          <Input 
                            type="date" 
                            placeholder="Due date (optional)" 
                            value={newTodoItem.dueDate}
                            onChange={(e) => setNewTodoItem({...newTodoItem, dueDate: e.target.value})}
                            className="w-40"
                          />
                          <select 
                            value={newTodoItem.priority}
                            onChange={(e) => setNewTodoItem({...newTodoItem, priority: e.target.value as any})}
                            className="h-10 px-3 rounded-md border border-input bg-background text-sm"
                          >
                            {priorities.map(priority => (
                              <option key={priority.value} value={priority.value}>
                                {priority.label}
                              </option>
                            ))}
                          </select>
                          <Button onClick={handleAddTodoItem}>
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <div className="space-y-2">
                      {getCurrentTodoList()?.todos.length === 0 ? (
                        <div className="text-center py-12 border rounded-lg">
                          <CheckCircle2 className="h-12 w-12 mx-auto text-muted-foreground" />
                          <p className="mt-4 text-muted-foreground">No tasks yet. Add your first task!</p>
                        </div>
                      ) : (
                        <ScrollArea className="h-[60vh] custom-scrollbar pr-4">
                          <div className="space-y-2">
                            {getCurrentTodoList()?.todos.map((todo) => (
                              <div 
                                key={todo.id}
                                className={`border rounded-lg p-3 transition-all ${todo.completed ? 'bg-muted/50' : ''}`}
                                style={{ 
                                  borderLeftColor: getPriorityColor(todo.priority),
                                  borderLeftWidth: '4px'
                                }}
                              >
                                {editingTodoItem === todo.id ? (
                                  // Edit mode
                                  <div className="space-y-3">
                                    <Input 
                                      value={editTodoData.text}
                                      onChange={(e) => setEditTodoData({...editTodoData, text: e.target.value})}
                                      placeholder="Task description"
                                    />
                                    
                                    <div className="flex space-x-2">
                                      <Input 
                                        type="date" 
                                        placeholder="Due date (optional)" 
                                        value={editTodoData.dueDate}
                                        onChange={(e) => setEditTodoData({...editTodoData, dueDate: e.target.value})}
                                        className="flex-1"
                                      />
                                      
                                      <select 
                                        value={editTodoData.priority}
                                        onChange={(e) => setEditTodoData({...editTodoData, priority: e.target.value as any})}
                                        className="h-10 px-3 rounded-md border border-input bg-background text-sm"
                                      >
                                        {priorities.map(priority => (
                                          <option key={priority.value} value={priority.value}>
                                            {priority.label}
                                          </option>
                                        ))}
                                      </select>
                                    </div>
                                    
                                    <div className="flex justify-end space-x-2">
                                      <Button 
                                        size="sm" 
                                        variant="outline"
                                        onClick={() => setEditingTodoItem(null)}
                                      >
                                        Cancel
                                      </Button>
                                      <Button 
                                        size="sm"
                                        onClick={() => handleSaveEditedTodoItem(currentTodoList as string)}
                                      >
                                        Save
                                      </Button>
                                    </div>
                                  </div>
                                ) : (
                                  // View mode
                                  <div className="flex items-start">
                                    <Checkbox 
                                      checked={todo.completed}
                                      onCheckedChange={() => handleToggleTodoCompleted(currentTodoList as string, todo.id)}
                                      className="mt-0.5 mr-3"
                                    />
                                    
                                    <div className="flex-1">
                                      <div className={`font-medium ${todo.completed ? 'line-through text-muted-foreground' : ''}`}>
                                        {todo.text}
                                      </div>
                                      
                                      <div className="flex flex-wrap text-xs text-muted-foreground mt-1">
                                        {todo.dueDate && (
                                          <div className="flex items-center mr-3">
                                            <CalendarDays className="h-3 w-3 mr-1" />
                                            <span>Due: {new Date(todo.dueDate).toLocaleDateString()}</span>
                                          </div>
                                        )}
                                        
                                       {todo.priority !== 'none' && (
  <Badge
    variant="outline"
    className={`mr-3 text-xs priority-${todo.priority}`}
    style={{
      backgroundColor: priorities.find((p) => p.value === todo.priority)?.color,
      color: priorities.find((p) => p.value === todo.priority)?.textColor,
      borderColor: 'transparent',
    }}
  >
    {priorities.find((p) => p.value === todo.priority)?.label} Priority
  </Badge>
)}
                                      </div>
                                    </div>
                                    
                                    <div className="flex">
                                      <Button 
                                        size="icon" 
                                        variant="ghost" 
                                        className="h-7 w-7"
                                        onClick={() => handleEditTodoItem(currentTodoList as string, todo.id)}
                                      >
                                        <Edit className="h-4 w-4" />
                                      </Button>
                                      <Button 
                                        size="icon" 
                                        variant="ghost" 
                                        className="h-7 w-7"
                                        onClick={() => handleDeleteTodoItem(currentTodoList as string, todo.id)}
                                      >
                                        <Trash2 className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </ScrollArea>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 border rounded-lg">
                    <ListTodo className="h-12 w-12 mx-auto text-muted-foreground" />
                    <p className="mt-4 text-muted-foreground">Select a list or create a new one.</p>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
          
          {/* GPA Calculator Section */}
          <TabsContent value="calculator" className="mt-6">
            <GPACalculator />
          </TabsContent>
          
          {/* Resources Section */}
          <TabsContent value="resources" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <UnitConverter />
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BookOpen className="mr-2 h-5 w-5" />
                    Useful Resources
                  </CardTitle>
                  <CardDescription>Quick access to helpful academic tools</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <Button variant="outline" className="h-auto py-4 px-4 justify-start flex-col items-start text-left">
                      <div className="flex w-full justify-between items-center mb-2">
                        <FileText className="h-5 w-5" />
                        <Badge variant="outline">Writing</Badge>
                      </div>
                      <div className="text-base font-medium">Citation Generator</div>
                      <p className="text-xs text-muted-foreground mt-1">Create properly formatted citations for your papers</p>
                    </Button>
                    
                    <Button variant="outline" className="h-auto py-4 px-4 justify-start flex-col items-start text-left">
                      <div className="flex w-full justify-between items-center mb-2">
                        <FileVideo className="h-5 w-5" />
                        <Badge variant="outline">Video</Badge>
                      </div>
                      <div className="text-base font-medium">Study Skills Tutorials</div>
                      <p className="text-xs text-muted-foreground mt-1">Learn effective study techniques and time management</p>
                    </Button>
                    
                    <Button variant="outline" className="h-auto py-4 px-4 justify-start flex-col items-start text-left">
                      <div className="flex w-full justify-between items-center mb-2">
                        <Users className="h-5 w-5" />
                        <Badge variant="outline">Connect</Badge>
                      </div>
                      <div className="text-base font-medium">Find Study Groups</div>
                      <p className="text-xs text-muted-foreground mt-1">Connect with students in your courses to study together</p>
                    </Button>
                    
                    <Button variant="outline" className="h-auto py-4 px-4 justify-start flex-col items-start text-left">
                      <div className="flex w-full justify-between items-center mb-2">
                        <FileImage className="h-5 w-5" />
                        <Badge variant="outline">Templates</Badge>
                      </div>
                      <div className="text-base font-medium">Project Templates</div>
                      <p className="text-xs text-muted-foreground mt-1">Download templates for papers, presentations, and more</p>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Task list dialog */}
      <Dialog open={showTasksDialog} onOpenChange={setShowTasksDialog}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Tasks in {selectedList?.name}</DialogTitle>
            <DialogDescription>
              View and manage tasks in this list
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <ScrollArea className="h-[300px] pr-4">
              <div className="space-y-2">
                {selectedList?.todos.map((todo) => (
                  <div 
                    key={todo.id}
                    className={`border rounded-lg p-3 transition-all ${todo.completed ? 'bg-muted/50' : ''}`}
                    style={{ 
                      borderLeftColor: getPriorityColor(todo.priority),
                      borderLeftWidth: '4px'
                    }}
                  >
                    <div className="flex items-start">
                      <Checkbox 
                        checked={todo.completed}
                        onCheckedChange={() => {
                          if (selectedList) {
                            handleToggleTodoCompleted(selectedList.id, todo.id);
                          }
                        }}
                        className="mt-0.5 mr-3"
                      />
                      
                      <div className="flex-1">
                        <div className={`font-medium ${todo.completed ? 'line-through text-muted-foreground' : ''}`}>
                          {todo.text}
                        </div>
                        
                        <div className="flex flex-wrap text-xs text-muted-foreground mt-1">
                          {todo.dueDate && (
                            <div className="flex items-center mr-3">
                              <CalendarDays className="h-3 w-3 mr-1" />
                              <span>Due: {new Date(todo.dueDate).toLocaleDateString()}</span>
                            </div>
                          )}
                          
                          {todo.priority !== 'none' && (
                            <Badge 
                              variant="outline" 
                              className="mr-3 text-xs"
                              style={{ 
                                backgroundColor: priorities.find(p => p.value === todo.priority)?.color,
                                borderColor: 'transparent'
                              }}
                            >
                              {priorities.find(p => p.value === todo.priority)?.label} Priority
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex">
                        <Button 
                          size="icon" 
                          variant="ghost" 
                          className="h-7 w-7"
                          onClick={() => {
                            if (selectedList) {
                              handleEditTodoItem(selectedList.id, todo.id);
                              setShowTasksDialog(false);
                            }
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="icon" 
                          variant="ghost" 
                          className="h-7 w-7"
                          onClick={() => {
                            if (selectedList) {
                              handleDeleteTodoItem(selectedList.id, todo.id);
                            }
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
                
                {selectedList?.todos.length === 0 && (
                  <div className="text-center py-8">
                    <CheckCircle2 className="h-8 w-8 mx-auto text-muted-foreground" />
                    <p className="mt-2 text-muted-foreground">No tasks in this list</p>
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowTasksDialog(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
};

export default Tools;
