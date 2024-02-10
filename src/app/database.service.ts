import { Injectable } from '@angular/core';
import { SupabaseClient, createClient } from '@supabase/supabase-js'

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  supabase:SupabaseClient;


  constructor() {
    const supabaseUrl = 'https://eexyrtphepvrlecwllxt.supabase.co'
    const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVleHlydHBoZXB2cmxlY3dsbHh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDU5NTQ1MjYsImV4cCI6MjAyMTUzMDUyNn0.w1cdFHWN59fxUWXiSeJ2q48gOr4_ZzXd98BQpHucIaY"
    this.supabase = createClient(supabaseUrl, supabaseKey)
  }

  async getBoard(){
    let { data: Game, error } = await this.supabase
    .from('Game')
    .select('board');
    return Game;
  }

  async updateBoard(board:number[][]){
    const { error } = await this.supabase
    .from('Game')
    .update({ board: board})
    .eq('id', 2)
  }

  async updatePlayer1(connectionState:boolean){
    const { error } = await this.supabase
    .from('Game')
    .update({ player1: connectionState})
    .eq('id', 2)
  }

  async getActiveConnections(){
    const { data, error } = await this.supabase.rpc('supabase inspect db role-connections')
    console.log(data, error)
  }
}
