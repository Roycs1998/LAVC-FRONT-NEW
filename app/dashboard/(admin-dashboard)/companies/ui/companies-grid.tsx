import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EntityStatus } from "@/modules/common/types";
import { Company } from "@/modules/company";
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
import {
  CreditCard,
  Edit,
  Eye,
  MoreHorizontal,
  Trash2,
  Users,
} from "lucide-react";
import React from "react";

interface Props {
  companies: Company[];
}

const CompaniesGrid = ({ companies }: Props) => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {companies.map((company) => (
        <Card key={company.id} className="hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={company.logo} />
                  <AvatarFallback>
                    {company.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-lg">{company.name}</CardTitle>
                  <CardDescription>{company.contactEmail}</CardDescription>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Company
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Users className="h-4 w-4 mr-2" />
                    Manage Users
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <CreditCard className="h-4 w-4 mr-2" />
                    Billing
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Badge
                variant={
                  company.entityStatus === EntityStatus.ACTIVE
                    ? "default"
                    : "secondary"
                }
                className={
                  company.entityStatus == EntityStatus.ACTIVE
                    ? "bg-green-100 text-green-800"
                    : company.entityStatus == EntityStatus.INACTIVE
                    ? "bg-red-100 text-red-800"
                    : "bg-gray-100 text-gray-800"
                }
              >
                {company.entityStatus}
              </Badge>
            </div>

            {/*             <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="space-y-1">
                <p className="text-muted-foreground">Events</p>
                <p className="font-medium">{company.stats.totalEvents}</p>
              </div>
              <div className="space-y-1">
                <p className="text-muted-foreground">Users</p>
                <p className="font-medium">{company.stats.totalUsers}</p>
              </div>
              <div className="space-y-1">
                <p className="text-muted-foreground">Revenue</p>
                <p className="font-medium">${company.stats.totalRevenue.toLocaleString()}</p>
              </div>
              <div className="space-y-1">
                <p className="text-muted-foreground">Active</p>
                <p className="font-medium">{company.stats.activeEvents}</p>
              </div>
            </div> */}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CompaniesGrid;
