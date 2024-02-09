import { Injectable } from '@angular/core';
import { SupabaseClient, createClient } from '@supabase/supabase-js'
import { BlockServiceService } from './block-service.service';
import { GameObject } from './game-object';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  supabase:SupabaseClient;


  constructor(private blockService:BlockServiceService) {
    const supabaseUrl = 'https://eexyrtphepvrlecwllxt.supabase.co'
    const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVleHlydHBoZXB2cmxlY3dsbHh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDU5NTQ1MjYsImV4cCI6MjAyMTUzMDUyNn0.w1cdFHWN59fxUWXiSeJ2q48gOr4_ZzXd98BQpHucIaY"
    this.supabase = createClient(supabaseUrl, supabaseKey)
  }

  async getBoard(){
  let { data: Game, error } = await this.supabase
  .from('Game')
  .select('game_object');
  return Game;
  }

  async updateBoard(gameObject:GameObject){
    const { error } = await this.supabase
    .from('Game')
    .update({ game_object: gameObject})
    .eq('id', 2)
    console.log(error)
  }
}
