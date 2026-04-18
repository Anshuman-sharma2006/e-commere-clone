import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Tailwind,
} from "@react-email/components";

import { randomUUID } from "crypto";
import { OrderInformation } from "./components/OrderInformation";

type PurchaseReceiptEmailProps = {
  product: {
    name: string;
    imagePath: string;
    description: string;
  };
  order: {
    id: string;
    createdAt: Date;
    pricePaidIntRupees: number;
  };
  downloadVerificationId: string;
};
PurchaseReceiptEmail.PreviewProps = {
  product: {
    name: "Product name",
    description: "Some description",
    imagePath:
      "/products/708ca046-0d90-4969-83e6-118f068249a6-ryan-waring-164_6wVEHfI-unsplash.jpg",
  },
  order: {
    id: randomUUID(),
    createdAt:  "14 Apr 2025",
    pricePaidIntRupees: 10000,
  },
  downloadVerificationId: randomUUID(),
} satisfies PurchaseReceiptEmailProps;

export default function PurchaseReceiptEmail({
  product,
  order,
  downloadVerificationId,
}: PurchaseReceiptEmailProps) {
  return (
    <Html>
      <Preview>Download {product.name} and view receipt</Preview>

      <Tailwind>
        <Head />

        <Body className="font-sans bg-white">
          <Container className="max-w-xl">
            <Heading>Purchase Receipt</Heading>

            <OrderInformation
              order={order}
              product={product}
              downloadVerificationId={downloadVerificationId}
            />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
