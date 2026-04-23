import { supabase } from '../lib/supabase'

export async function getAllCostCenters() {
  const { data, error } = await supabase
    .from('cost_centers')
    .select('*')
  return { data, error }
}

export async function getCostCenter(id) {
  const { data, error } = await supabase
    .from('cost_centers')
    .select('*')
    .eq('id', id)
    .single()
  return { data, error }
}

export async function createCostCenter(fields) {
  const { data, error } = await supabase
    .from('cost_centers')
    .insert(fields)
    .select()
  return { data, error }
}

export async function updateCostCenter(id, fields) {
  const { data, error } = await supabase
    .from('cost_centers')
    .update(fields)
    .eq('id', id)
    .select()
  return { data, error }
}

export async function deleteCostCenter(id) {
  const { data, error } = await supabase
    .from('cost_centers')
    .delete()
    .eq('id', id)
  return { data, error }
}