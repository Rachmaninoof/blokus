import { Injectable } from '@angular/core';
import { SupabaseClient, createClient } from '@supabase/supabase-js'
import { BlockList } from 'net';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  supabase:SupabaseClient;
  realtime:BehaviorSubject<any>

  constructor() {
    const supabaseUrl = 'https://eexyrtphepvrlecwllxt.supabase.co'
    const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVleHlydHBoZXB2cmxlY3dsbHh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDU5NTQ1MjYsImV4cCI6MjAyMTUzMDUyNn0.w1cdFHWN59fxUWXiSeJ2q48gOr4_ZzXd98BQpHucIaY"
    this.supabase = createClient(supabaseUrl, supabaseKey)

    this.realtime = new BehaviorSubject(0);

    const channels = this.supabase.channel('custom-update-channel')
    .on(
      'postgres_changes',
      { event: 'UPDATE', schema: 'public', table: 'board' },
      (payload:any) => {
        this.realtime.next(payload);
        console.log(payload)
      }
    )
    .subscribe()
  }

  async getBoard(){
    let { data: board, error } = await this.supabase
    .from('board')
    .select('board');
    return board;
  }

  async updateBoard(board:number[][]){
    const { error } = await this.supabase
    .from('board')
    .update({ board: board})
    .eq('id', 1)
    console.log(error)
  }

  async updatePlayer1(lastConnection:number){
    const { error } = await this.supabase
    .from('Game')
    .update({ player1_connection: lastConnection})
    .eq('id', 2)
    return error
  }

  async getPlayer1Connection(){
    let { data: connection, error } = await this.supabase
    .from('Game')
    .select('player1_connection');
    return connection;
  }

  async updatePlayer2(lastConnection:number){
    const { error } = await this.supabase
    .from('Game')
    .update({ player2_connection: lastConnection})
    .eq('id', 2)
    return error
  }

  async getPlayer2Connection(){
    let { data: connection, error } = await this.supabase
    .from('Game')
    .select('player2_connection');
    return {connection,error};
  }

  async getPlayer1Blocks(){
    let { data: blockIndexes, error } = await this.supabase
    .from('board')
    .select('player1_blocks');
    return {blockIndexes,error};
  }

  async getPlayer2Blocks(){
    let { data: blockIndexes, error } = await this.supabase
    .from('board')
    .select('player2_blocks');
    return {blockIndexes,error};
  }

  async updatePlayer1Blocks(indexList:boolean[]){
    const { error } = await this.supabase
    .from('board')
    .update({ player1_blocks: indexList})
    .eq('id', 1)
    return error
  }

  async updatePlayer2Blocks(indexList:boolean[]){
    const { error } = await this.supabase
    .from('board')
    .update({ player2_blocks: indexList})
    .eq('id', 1)
    return error
  }

  async updateTurns(int:number){
    const { error } = await this.supabase
    .from('board')
    .update({ turns: int})
    .eq('id', 1)
    return error
  }

  async getTurns(){
    let { data: turns, error } = await this.supabase
    .from('board')
    .select('turns');
    return {turns,error};
  }

}
