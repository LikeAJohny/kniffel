export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      game_variants: {
        Row: {
          id: string
          name: string
        }
        Insert: {
          id?: string
          name: string
        }
        Update: {
          id?: string
          name?: string
        }
        Relationships: []
      }
      kniffel_extreme_games: {
        Row: {
          chance: number | null
          fives: number | null
          four_of_a_kind: number | null
          fours: number | null
          full_house: number | null
          game_total: number
          highway: number | null
          large_full_house: number | null
          large_straight: number | null
          lower_total: number
          number: number
          ones: number | null
          session_id: string
          sixes: number | null
          small_straight: number | null
          super_chance: number | null
          ten_or_less: number | null
          thirty_tree_or_more: number | null
          three_of_a_kind: number | null
          three_pairs: number | null
          threes: number | null
          two_pairs: number | null
          two_threes: number | null
          twos: number | null
          upper_bonus: number
          upper_sum: number
          upper_total: number
          yahtzee: number | null
          yahtzee_extreme: number | null
        }
        Insert: {
          chance?: number | null
          fives?: number | null
          four_of_a_kind?: number | null
          fours?: number | null
          full_house?: number | null
          game_total: number
          highway?: number | null
          large_full_house?: number | null
          large_straight?: number | null
          lower_total?: number
          number?: number
          ones?: number | null
          session_id: string
          sixes?: number | null
          small_straight?: number | null
          super_chance?: number | null
          ten_or_less?: number | null
          thirty_tree_or_more?: number | null
          three_of_a_kind?: number | null
          three_pairs?: number | null
          threes?: number | null
          two_pairs?: number | null
          two_threes?: number | null
          twos?: number | null
          upper_bonus?: number
          upper_sum?: number
          upper_total?: number
          yahtzee?: number | null
          yahtzee_extreme?: number | null
        }
        Update: {
          chance?: number | null
          fives?: number | null
          four_of_a_kind?: number | null
          fours?: number | null
          full_house?: number | null
          game_total?: number
          highway?: number | null
          large_full_house?: number | null
          large_straight?: number | null
          lower_total?: number
          number?: number
          ones?: number | null
          session_id?: string
          sixes?: number | null
          small_straight?: number | null
          super_chance?: number | null
          ten_or_less?: number | null
          thirty_tree_or_more?: number | null
          three_of_a_kind?: number | null
          three_pairs?: number | null
          threes?: number | null
          two_pairs?: number | null
          two_threes?: number | null
          twos?: number | null
          upper_bonus?: number
          upper_sum?: number
          upper_total?: number
          yahtzee?: number | null
          yahtzee_extreme?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "kniffel_extreme_games_session_id_fkey"
            columns: ["session_id"]
            referencedRelation: "sessions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "kniffel_extreme_games_session_id_fkey"
            columns: ["session_id"]
            referencedRelation: "kniffel_extreme_sessions_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "kniffel_extreme_games_session_id_fkey"
            columns: ["session_id"]
            referencedRelation: "kniffel_sessions_view"
            referencedColumns: ["id"]
          }
        ]
      }
      kniffel_games: {
        Row: {
          chance: number | null
          fives: number | null
          four_of_a_kind: number | null
          fours: number | null
          full_house: number | null
          game_total: number
          large_straight: number | null
          lower_total: number
          number: number
          ones: number | null
          session_id: string
          sixes: number | null
          small_straight: number | null
          three_of_a_kind: number | null
          threes: number | null
          twos: number | null
          upper_bonus: number
          upper_sum: number
          upper_total: number
          yahtzee: number | null
        }
        Insert: {
          chance?: number | null
          fives?: number | null
          four_of_a_kind?: number | null
          fours?: number | null
          full_house?: number | null
          game_total: number
          large_straight?: number | null
          lower_total?: number
          number?: number
          ones?: number | null
          session_id: string
          sixes?: number | null
          small_straight?: number | null
          three_of_a_kind?: number | null
          threes?: number | null
          twos?: number | null
          upper_bonus?: number
          upper_sum?: number
          upper_total?: number
          yahtzee?: number | null
        }
        Update: {
          chance?: number | null
          fives?: number | null
          four_of_a_kind?: number | null
          fours?: number | null
          full_house?: number | null
          game_total?: number
          large_straight?: number | null
          lower_total?: number
          number?: number
          ones?: number | null
          session_id?: string
          sixes?: number | null
          small_straight?: number | null
          three_of_a_kind?: number | null
          threes?: number | null
          twos?: number | null
          upper_bonus?: number
          upper_sum?: number
          upper_total?: number
          yahtzee?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "kniffel_games_session_id_fkey"
            columns: ["session_id"]
            referencedRelation: "sessions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "kniffel_games_session_id_fkey"
            columns: ["session_id"]
            referencedRelation: "kniffel_extreme_sessions_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "kniffel_games_session_id_fkey"
            columns: ["session_id"]
            referencedRelation: "kniffel_sessions_view"
            referencedColumns: ["id"]
          }
        ]
      }
      players: {
        Row: {
          id: string
          name: string
        }
        Insert: {
          id: string
          name: string
        }
        Update: {
          id?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "players_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      sessions: {
        Row: {
          finished_at: string | null
          id: string
          player_id: string
          score: number
          started_at: string
          status: string
          variant_id: string
        }
        Insert: {
          finished_at?: string | null
          id?: string
          player_id: string
          score?: number
          started_at?: string
          status?: string
          variant_id: string
        }
        Update: {
          finished_at?: string | null
          id?: string
          player_id?: string
          score?: number
          started_at?: string
          status?: string
          variant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "sessions_player_id_fkey"
            columns: ["player_id"]
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sessions_variant_id_fkey"
            columns: ["variant_id"]
            referencedRelation: "game_variants"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      kniffel_extreme_sessions_view: {
        Row: {
          finished_at: string | null
          id: string | null
          name: string | null
          player_id: string | null
          score: number | null
          started_at: string | null
          status: string | null
          variant_id: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sessions_player_id_fkey"
            columns: ["player_id"]
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sessions_variant_id_fkey"
            columns: ["variant_id"]
            referencedRelation: "game_variants"
            referencedColumns: ["id"]
          }
        ]
      }
      kniffel_sessions_view: {
        Row: {
          finished_at: string | null
          id: string | null
          name: string | null
          player_id: string | null
          score: number | null
          started_at: string | null
          status: string | null
          variant_id: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sessions_player_id_fkey"
            columns: ["player_id"]
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sessions_variant_id_fkey"
            columns: ["variant_id"]
            referencedRelation: "game_variants"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
