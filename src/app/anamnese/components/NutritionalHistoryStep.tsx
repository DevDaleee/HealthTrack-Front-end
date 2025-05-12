import { FileText, User } from 'lucide-react';

interface Props {
  formData: any;
  onChange: (e: React.ChangeEvent<any>) => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function NutritionalHistoryStep({
  formData,
  onChange,
  onNext,
  onPrev,
}: Props) {
  return (
    <div className="justify-center p-10">
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <FileText className="mr-2" /> História Nutricional
      </h2>
      <div className="grid grid-cols-2 gap-4">
        <textarea
          name="foodPreferences"
          placeholder="Preferências Alimentares"
          value={formData.foodPreferences}
          onChange={onChange}
          className="w-full p-2 border rounded"
          rows={3}
        />
        <textarea
          name="foodAversions"
          placeholder="Aversões Alimentares"
          value={formData.foodAversions}
          onChange={onChange}
          className="w-full p-2 border rounded"
          rows={3}
        />
        <input
          type="text"
          name="dietaryRestrictions"
          placeholder="Restrições Dietéticas"
          value={formData.dietaryRestrictions}
          onChange={onChange}
          className="w-full p-2 border rounded"
        />
        <div className="flex items-center">
          <label className="mr-2">Alergias:</label>
          <select
            name="allergies"
            value={formData.allergies}
            onChange={onChange}
            className="w-full p-2 border rounded"
          >
            <option value="">Selecione</option>
            <option value="sim">Sim</option>
            <option value="nao">Não</option>
          </select>
        </div>
        {formData.allergies === 'sim' && (
          <input
            type="text"
            name="allergiesDetails"
            placeholder="Detalhes das Alergias"
            value={formData.allergiesDetails}
            onChange={onChange}
            className="w-full p-2 border rounded"
          />
        )}
        <select
          name="appetite"
          value={formData.appetite}
          onChange={onChange}
          className="w-full p-2 border rounded"
        >
          <option value="">Apetite</option>
          <option value="bom">Bom</option>
          <option value="regular">Regular</option>
          <option value="ruim">Ruim</option>
        </select>
        <div className="flex items-center">
          <label className="mr-2">Suplementos:</label>
          <select
            name="supplements"
            value={formData.supplements}
            onChange={onChange}
            className="w-full p-2 border rounded"
          >
            <option value="">Selecione</option>
            <option value="sim">Sim</option>
            <option value="nao">Não</option>
          </select>
        </div>
        {formData.supplements === 'sim' && (
          <input
            type="text"
            name="supplementsDetails"
            placeholder="Detalhes dos Suplementos"
            value={formData.supplementsDetails}
            onChange={onChange}
            className="w-full p-2 border rounded"
          />
        )}
        <select
          name="mealsPerDay"
          value={formData.mealsPerDay}
          onChange={onChange}
          className="w-full p-2 border rounded"
        >
          <option value="">Refeições por Dia</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5+">5+</option>
        </select>
        <select
          name="fruitsVegetables"
          value={formData.fruitsVegetables}
          onChange={onChange}
          className="w-full p-2 border rounded"
        >
          <option value="">Consome Frutas e Vegetais Diariamente?</option>
          <option value="sim">Sim</option>
          <option value="nao">Não</option>
        </select>
        <select
          name="waterConsumption"
          value={formData.waterConsumption}
          onChange={onChange}
          className="w-full p-2 border rounded"
        >
          <option value="">Bebe Água Regularmente?</option>
          <option value="sim">Sim</option>
          <option value="nao">Não</option>
        </select>
        <select
          name="ultraprocessedFoods"
          value={formData.ultraprocessedFoods}
          onChange={onChange}
          className="w-full p-2 border rounded"
        >
          <option value="">Frequência de Alimentos Ultraprocessados</option>
          <option value="nunca">Nunca</option>
          <option value="raramente">Raramente</option>
          <option value="as_vezes">Às Vezes</option>
          <option value="frequentemente">Frequentemente</option>
        </select>
      </div>
      <div className="flex justify-between mt-4">
        <button
          type="button"
          onClick={onPrev}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Anterior
        </button>
        <button
          type="button"
          onClick={onNext}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Próximo
        </button>
      </div>
    </div>
  );
}
