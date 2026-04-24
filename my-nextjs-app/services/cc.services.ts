import { supabase } from '@/lib/supabaseClient'

export type CostCenter = {
  name: string;
  balance: number;
  add_amount: number;
  exp_amount: number;
  p_add: number;
  p_exp: number;
};

export async function getAllCostCenters(team: "IC" | "EV") {
  const { data, error } = await supabase
    .from('cost_centers')
    .select('name, balance, add_amount, exp_amount, p_add, p_exp')
    .eq("comp", team)

  if (error) {
    console.error("Supabase error fetching all CCs:", error);
    return [];
  }

  return (data as CostCenter[]).map((cc) => ({
    ...cc,
    remaining:
      cc.balance +
      cc.p_add +
      cc.p_exp,
  }));
}

export async function getCostCenter(id: string) {
  const { data, error } = await supabase
    .from('cost_centers')
    .select('*')
    .eq('id', id)
    .single()
  
  if (error) {
    console.error("Supabase error fetching CC by id:", error);
    return;
  }

  return { data }
  
}

// export async function createCostCenter(fields) {
//   const { data, error } = await supabase
//     .from('cost_centers')
//     .insert(fields)
//     .select()
//   return { data, error }
// }

// export async function updateCostCenter(id, fields) {
//   const { data, error } = await supabase
//     .from('cost_centers')
//     .update(fields)
//     .eq('id', id)
//     .select()
//   return { data, error }
// }

// export async function deleteCostCenter(id) {
//   const { data, error } = await supabase
//     .from('cost_centers')
//     .delete()
//     .eq('id', id)
//   return { data, error }
// }