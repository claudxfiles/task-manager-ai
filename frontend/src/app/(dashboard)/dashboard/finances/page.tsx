"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, CreditCard, Wallet, DollarSign, ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLocalStorage } from "@/hooks/useLocalStorage";

interface Transaction {
  id: string;
  amount: number;
  type: "income" | "expense";
  description: string;
  date: string;
  category: string;
}

interface Account {
  id: string;
  name: string;
  balance: number;
  currency: string;
  transactions: Transaction[];
}

interface CreditCard {
  id: string;
  name: string;
  balance: number;
  limit: number;
  currency: string;
  transactions: Transaction[];
}

const defaultAccounts: Account[] = [
  {
    id: "1",
    name: "Cuenta 1",
    balance: 0,
    currency: "US$",
    transactions: []
  },
  {
    id: "2",
    name: "Cuenta 2",
    balance: 0,
    currency: "US$",
    transactions: []
  }
];

export default function FinancesPage() {
  const [accounts, setAccounts] = useLocalStorage<Account[]>("accounts", defaultAccounts);
  const [creditCards, setCreditCards] = useLocalStorage<CreditCard[]>("creditCards", []);
  const [activeTab, setActiveTab] = useState("accounts");

  const addTransaction = (accountId: string, transaction: Omit<Transaction, "id">) => {
    const newTransaction = {
      ...transaction,
      id: Date.now().toString(),
    };

    setAccounts(prevAccounts =>
      prevAccounts.map(account => {
        if (account.id === accountId) {
          const newBalance = transaction.type === "income"
            ? account.balance + transaction.amount
            : account.balance - transaction.amount;
          
          return {
            ...account,
            balance: newBalance,
            transactions: [...account.transactions, newTransaction]
          };
        }
        return account;
      })
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <motion.h1 
          className="text-2xl font-bold"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Finanzas
        </motion.h1>
      </div>

      <Tabs defaultValue="accounts" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="accounts" className="flex items-center gap-2">
            <Wallet size={20} /> Cuentas
          </TabsTrigger>
          <TabsTrigger value="creditCards" className="flex items-center gap-2">
            <CreditCard size={20} /> Tarjetas de Crédito
          </TabsTrigger>
        </TabsList>

        <TabsContent value="accounts" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {accounts.map(account => (
              <Card key={account.id} className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">{account.name}</h3>
                  <Button variant="outline" size="sm">
                    <Plus size={16} className="mr-2" /> Agregar Transacción
                  </Button>
                </div>
                <div className="flex items-center gap-2 mb-6">
                  <DollarSign className="text-muted-foreground" size={20} />
                  <span className="text-2xl font-bold">
                    {account.balance.toFixed(2)} {account.currency}
                  </span>
                </div>
                <div className="space-y-2">
                  {account.transactions.slice(-3).map(transaction => (
                    <div key={transaction.id} className="flex justify-between items-center p-2 rounded-lg bg-muted/50">
                      <div className="flex items-center gap-2">
                        {transaction.type === "income" ? (
                          <ArrowUpRight className="text-green-500" size={18} />
                        ) : (
                          <ArrowDownRight className="text-red-500" size={18} />
                        )}
                        <span className="text-sm">{transaction.description}</span>
                      </div>
                      <span className={`font-medium ${
                        transaction.type === "income" ? "text-green-500" : "text-red-500"
                      }`}>
                        {transaction.type === "income" ? "+" : "-"}
                        {transaction.amount.toFixed(2)} {account.currency}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="creditCards" className="space-y-4">
          <div className="flex justify-end">
            <Button>
              <Plus size={20} className="mr-2" /> Nueva Tarjeta
            </Button>
          </div>
          {creditCards.length === 0 ? (
            <Card className="p-6 text-center">
              <CreditCard size={40} className="mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">No hay tarjetas registradas</h3>
              <p className="text-muted-foreground">
                Agrega una tarjeta de crédito para hacer seguimiento de tus gastos
              </p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Aquí irán las tarjetas de crédito */}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
} 