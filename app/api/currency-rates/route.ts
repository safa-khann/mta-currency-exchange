import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '../../../lib/supabase-admin' // or '@/lib/supabase-admin'
// GET all currency rates
export async function GET() {
  try {
    const supabaseAdmin = getSupabaseAdmin() as any
    
    const { data, error } = await supabaseAdmin
      .from('currency_rates')
      .select('*')
      .order('currency_code')

    if (error) throw error
    
    return NextResponse.json({ rates: data || [] })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}

// POST add new currency rate
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Simple validation
    if (!body.currency_name || !body.currency_code || !body.country_name || 
        !body.buy_rate || !body.sell_rate) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    const supabaseAdmin = getSupabaseAdmin() as any
    
    const { data, error } = await supabaseAdmin
      .from('currency_rates')
      .insert([{
        currency_name: body.currency_name,
        currency_code: body.currency_code.toUpperCase(),
        country_name: body.country_name,
        buy_rate: parseFloat(body.buy_rate),
        sell_rate: parseFloat(body.sell_rate)
      }])
      .select()
      .single()

    if (error) throw error
    
    return NextResponse.json(
      { success: true, data },
      { status: 201 }
    )
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Need ID and at least one field to update
    if (!body.id || (body.buy_rate === undefined && body.sell_rate === undefined)) {
      return NextResponse.json(
        { error: 'ID and at least one rate (buy_rate or sell_rate) is required' },
        { status: 400 }
      )
    }

    const supabase = getSupabaseAdmin() as any
    
    // Prepare update data
    const updateData: any = {}
    if (body.buy_rate !== undefined) updateData.buy_rate = parseFloat(body.buy_rate)
    if (body.sell_rate !== undefined) updateData.sell_rate = parseFloat(body.sell_rate)
    
    // Update timestamp
    updateData.updated_at = new Date().toISOString()

    const { data, error } = await supabase
      .from('currency_rates')
      .update(updateData)
      .eq('id', body.id)
      .select()
      .single()

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Currency rate updated successfully',
        data 
      }
    )
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}
