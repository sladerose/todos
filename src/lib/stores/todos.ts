import { writable } from 'svelte/store';
import { supabase } from '$lib/supabaseClient';

export type Todo = {
    id: string;
    content: string;
    is_complete: boolean;
    inserted_at: string;
};

export const todos = writable<Todo[]>([]);

export async function fetchTodos() {
    const { data, error } = await supabase
        .from('todos')
        .select('*')
        .order('inserted_at', { ascending: false });

    if (error) {
        console.error('Error fetching todos:', error.message);
        return;
    }

    todos.set(data as Todo[]);
}

export async function addTodo(content: string) {
    const { error } = await supabase.from('todos').insert([{ content }]);
    if (error) {
        console.error('Error adding todo:', error.message);
        return;
    }

    await fetchTodos();
}

export async function toggleTodo(id: string, is_complete: boolean) {
    const { error } = await supabase
        .from('todos')
        .update({ is_complete: !is_complete })
        .eq('id', id);

    if (error) {
        console.error('Error toggling todo:', error.message);
        return;
    }

    await fetchTodos();
}

export async function deleteTodo(id: string) {
    const { error } = await supabase.from('todos').delete().eq('id', id);
    if (error) {
        console.error('Error deleting todo:', error.message);
        return;
    }

    await fetchTodos();
}
