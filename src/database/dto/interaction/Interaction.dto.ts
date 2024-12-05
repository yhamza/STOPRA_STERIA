export class CreateInteractionDto {
    action: string; // Action réalisée (ex: "click", "view", etc.)
    userId: string; // Référence à l'utilisateur
  }
  
  export class InteractionResponseDto {
    id: string;
    action: string;
    timestamp: Date;
    userId: string;
  }
  