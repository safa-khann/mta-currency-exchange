export interface Database {
  public: {
    Tables: {
      currency_rates: {
        Row: {
          id: number
          currency_name: string
          currency_code: string
          country_name: string
          buy_rate: number
          sell_rate: number
          updated_at: string | null  
        }
        Insert: {
          id?: number
          currency_name: string
          currency_code: string
          country_name: string
          buy_rate: number
          sell_rate: number
          updated_at?: string | null  
        }
        Update: {
          id?: number
          currency_name?: string
          currency_code?: string
          country_name?: string
          buy_rate?: number
          sell_rate?: number
          updated_at?: string | null  
        }
      }
    }
  }
}