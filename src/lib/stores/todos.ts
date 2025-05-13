// Store and Supabase client import
import { writable } from 'svelte/store';
import { supabase } from '$lib/supabaseClient';

// Define the shape of a single to-do item
export type Todo = {
    id: string;
    content: string;
    is_complete: boolean;
    inserted_at: string;
    priority: string;
    due_date: string | null;
    category: string;
};

// Create a writable store to hold the user's to-do list
export const todos = writable<Todo[]>([]);

// Fetch all todos for the currently logged-in user
export async function fetchTodos() {
    const { data, error } = await supabase
        .from('todos')
        .select('*')
        .order('inserted_at', { ascending: false });

    if (error) {
        console.error('Error fetching todos:', error.message);
        return;
    }

    // Update the local store with the fetched todos
    todos.set(data as Todo[]);
}

// Add a new todo item for the current user
export async function addTodo(
    content: string,
    priority: string,
    due_date: string | null,
    category: string
) {
    const { data: userSession } = await supabase.auth.getSession();
    const user = userSession.session?.user;

    // Ensure the user is logged in before inserting
    if (!user) {
        console.error('User not logged in');
        return;
    }

    // Insert the new todo with the user's ID and priority
    const { error } = await supabase.from('todos').insert([
        { content, priority, due_date, category, user_id: user.id }
    ]);

    if (error) {
        console.error('Error adding todo:', error.message);
        return;
    }

    // Refresh the store with the updated todo list
    await fetchTodos();
}

// Toggle the completion status of a todo
export async function toggleTodo(id: string, is_complete: boolean) {
    const { error } = await supabase
        .from('todos')
        .update({ is_complete: !is_complete })
        .eq('id', id);

    if (error) {
        console.error('Error toggling todo:', error.message);
        return;
    }

    // Refresh the store to reflect the change
    await fetchTodos();
}

// Delete a todo by ID
export async function deleteTodo(id: string) {
    const { error } = await supabase.from('todos').delete().eq('id', id);
    if (error) {
        console.error('Error deleting todo:', error.message);
        return;
    }

    // Refresh the store to remove the deleted item
    await fetchTodos();
}
