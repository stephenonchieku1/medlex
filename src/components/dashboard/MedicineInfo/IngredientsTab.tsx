import type { TabContentProps } from "@/types/ibm";
import TabSkeleton from "./TabSkeleton";

interface Ingredient {
  name: string;
  description?: string;
  [key: string]: any;
}

interface IngredientsAnalysis {
  active_ingredients: Ingredient[];
  key_inactive_ingredients: Ingredient[];
  [key: string]: any;
}

export default function IngredientsTab({
  fdaData,
  sideEffectData,
  isLoading,
}: TabContentProps) {
  if (isLoading) {
    return <TabSkeleton />;
  }

  // Original FDA data
  const StructuredProductLabeling =
    fdaData?.data.results?.[0]?.spl_product_data_elements?.[0];
  const activeIngredients = fdaData?.data.results?.[0]?.active_ingredient?.[0];
  const inactiveIngredients =
    fdaData?.data.results?.[0]?.inactive_ingredient?.[0];

  // New enhanced ingredients analysis data
  const ingredientsAnalysis = sideEffectData?.data?.ingredientsAnalysis;

  const hasAnyIngredients =
    activeIngredients || 
    inactiveIngredients || 
    StructuredProductLabeling || 
    (ingredientsAnalysis?.active_ingredients?.length > 0) ||
    (ingredientsAnalysis?.key_inactive_ingredients?.length > 0);

  if (!hasAnyIngredients) {
    return (
      <div className="text-gray-500">No ingredients information available.</div>
    );
  }

  return (
    <div className="space-y-6">
      <section>
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-semibold">Ingredients</h3>
        </div>
      </section>

      {/* Enhanced Active Ingredients Analysis */}
      {ingredientsAnalysis?.active_ingredients?.length > 0 && (
        <section className="space-y-4">
          <h4 className="font-medium text-blue-700">Active Ingredients Analysis</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ingredientsAnalysis.active_ingredients.map((ingredient: Ingredient, index: number) => (
              <div key={index} className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h5 className="font-semibold text-blue-800">{ingredient.name}</h5>
                {ingredient.purpose && (
                  <div className="mt-2">
                    <span className="font-medium">Purpose:</span> {ingredient.purpose}
                  </div>
                )}
                {ingredient.notes && (
                  <div className="mt-2 text-sm text-gray-700">
                    <span className="font-medium">Notes:</span> {ingredient.notes}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Enhanced Inactive Ingredients Analysis */}
      {ingredientsAnalysis?.key_inactive_ingredients?.length > 0 && (
        <section className="space-y-4">
          <h4 className="font-medium text-gray-700">Key Inactive Ingredients</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ingredientsAnalysis.key_inactive_ingredients.map((ingredient: Ingredient, index: number) => (
              <div key={index} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h5 className="font-semibold">{ingredient.name}</h5>
                {ingredient.purpose && (
                  <div className="mt-2">
                    <span className="font-medium">Purpose:</span> {ingredient.purpose}
                  </div>
                )}
                {ingredient.potential_concerns && (
                  <div className="mt-2 text-sm text-amber-700">
                    <span className="font-medium">Potential Concerns:</span> {ingredient.potential_concerns}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Original FDA Ingredient Information */}
      <section className="space-y-4">
        {activeIngredients && (
          <div>
            <h4 className="font-medium mb-2">Active Ingredients:</h4>
            <p className="text-sm">
              {Array.isArray(activeIngredients)
                ? activeIngredients.join(", ")
                : activeIngredients}
            </p>
          </div>
        )}

        {inactiveIngredients && (
          <div>
            <h4 className="font-medium mb-2">Inactive Ingredients:</h4>
            <p className="text-sm">
              {Array.isArray(inactiveIngredients)
                ? inactiveIngredients.join(", ")
                : inactiveIngredients}
            </p>
          </div>
        )}

        {StructuredProductLabeling && (
          <div>
            <h4 className="font-medium mb-2">Structured Product Labeling:</h4>
            <p className="text-sm">{StructuredProductLabeling}</p>
          </div>
        )}
      </section>
    </div>
  );
}