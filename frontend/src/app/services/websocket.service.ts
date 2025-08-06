import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private socket: WebSocket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 3000;

  // Signal para el estado de conexión
  public isConnected = signal<boolean>(false);
  
  // Map para almacenar callbacks por tipo de mensaje
  private messageHandlers = new Map<string, Set<() => void>>();

  constructor() {
    this.connect();
  }

  private connect() {
    try {
      this.socket = new WebSocket('ws://localhost/backend/');
      
      this.socket.addEventListener('open', () => {
        console.log('WebSocket conectado');
        this.isConnected.set(true);
        this.reconnectAttempts = 0;
      });

      this.socket.addEventListener('message', (event) => {
        console.log('Mensaje WebSocket recibido:', event.data);
        
        // Ejecutar todos los handlers registrados para este tipo de mensaje
        const handlers = this.messageHandlers.get(event.data);
        if (handlers) {
          handlers.forEach(handler => handler());
        }
      });

      this.socket.addEventListener('close', () => {
        console.log('WebSocket desconectado');
        this.isConnected.set(false);
        this.handleReconnect();
      });

      this.socket.addEventListener('error', (error) => {
        console.error('Error en WebSocket:', error);
        this.isConnected.set(false);
      });

    } catch (error) {
      console.error('Error al conectar WebSocket:', error);
      this.handleReconnect();
    }
  }

  private handleReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      console.log(`Intentando reconectar WebSocket (${this.reconnectAttempts}/${this.maxReconnectAttempts})...`);
      
      setTimeout(() => {
        this.connect();
      }, this.reconnectDelay);
    } else {
      console.error('Máximo número de intentos de reconexión alcanzado');
    }
  }

  // Registrar un handler para un tipo específico de mensaje
  public onMessage(messageType: string, handler: () => void) {
    if (!this.messageHandlers.has(messageType)) {
      this.messageHandlers.set(messageType, new Set());
    }
    this.messageHandlers.get(messageType)!.add(handler);

    // Retornar función para desregistrar el handler
    return () => {
      const handlers = this.messageHandlers.get(messageType);
      if (handlers) {
        handlers.delete(handler);
        if (handlers.size === 0) {
          this.messageHandlers.delete(messageType);
        }
      }
    };
  }

  // Enviar mensaje (si necesitas enviar datos al servidor)
  public send(message: string) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(message);
    } else {
      console.warn('WebSocket no está conectado');
    }
  }

  // Cerrar conexión
  public disconnect() {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
    this.messageHandlers.clear();
    this.isConnected.set(false);
  }
}